"use server";

import { connectToDatabase, connected } from "../database";
import { ITag, Tag } from "../models/tag";

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
