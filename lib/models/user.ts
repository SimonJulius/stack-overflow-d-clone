import { Schema, Types, model, models } from "mongoose";

export interface IUser {
  clerkId: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved?: Types.ObjectId;
}

const usersSchema = new Schema<IUser>(
  {
    clerkId: { type: String, require: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    bio: { type: String },
    picture: { type: String },
    location: { type: String },
    portfolioWebsite: { type: String },
    reputation: { type: Number },
    saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<IUser>("User", usersSchema);
