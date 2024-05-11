"use server";

import { GetTopInteractedTagsParams } from "@/types/server.type";
import { connectToDatabase, connected } from "../database";
import { ITag, Tag } from "../models/tag";
import { User } from "../models/user";

export const createTag = async (params: ITag) => {
  try {
    // Server code here
    if (!connected) {
      await connectToDatabase();
    }

    const tags = new Tag(params);
    const response = await tags.save();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTopInteractedTags = async (
  params: GetTopInteractedTagsParams
) => {
  try {
    // Server code here
    if (!connected) {
      await connectToDatabase();
    }

    const { userId } = params;
    const user = User.findById(userId);
    if (!user) throw new Error("User not found");
    // TODO: Find interactions for the user and group by Id
    return [
      { _id: 1, name: "tag1" },
      { _id: 2, name: "tag2" },
      { _id: 3, name: "tag3" },
    ];
  } catch (error) {
    console.error(error);
  }
};
