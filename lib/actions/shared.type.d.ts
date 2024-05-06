import { Types } from "mongoose";
import { IUser } from "../models/user";

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Types.ObjectId | IUser;
  path: string;
}
export interface GetUserByIdParams {
  userId: string;
}
