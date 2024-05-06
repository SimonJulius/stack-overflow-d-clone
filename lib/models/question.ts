import { Schema, model, Document, Types, models } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  author: Types.ObjectId;
  answers: Types.ObjectId[];
}

const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    answers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export const Question =
  models.Question || model<IQuestion>("Question", questionSchema);
