/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  console.log("POST_CALLED: ", req);
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;
  console.log("EVENT_TYPE: ", eventType);
  if (eventType === "user.created") {
    const { first_name, last_name, id, image_url, username, email_addresses } =
      evt.data;

    const userInfo = {
      clerkId: id,
      name: `${first_name} ${last_name || ""}`,
      picture: image_url,
      email: email_addresses[0].email_address,
      username: username || "",
      reputation: 0,
    };
    const mongoUser = await createUser(userInfo);

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType === "user.updated") {
    const { first_name, last_name, id, image_url, username, email_addresses } =
      evt.data;

    const userInfo = {
      clerkId: id,
      updateData: {
        name: `${first_name} ${last_name || ""}`,
        picture: image_url,
        email: email_addresses[0].email_address,
        username: username || "",
      },
      path: `/profile/${id}`,
    };
    const mongoUser = await updateUser(userInfo);

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const id = evt.data.id;
    const mongoUser = await deleteUser({ clerkId: id! });

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  return new Response("", { status: 200 });
}
