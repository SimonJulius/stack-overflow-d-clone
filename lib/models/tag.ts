import { Schema, model, Document, Types, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Types.ObjectId[];
  followers: Types.ObjectId[];
}

const tagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export const Tag = models.Tag || model<ITag>("Tag", tagSchema);
