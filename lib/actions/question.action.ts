"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase, connected } from "../database";
import { Question } from "../models/question";
import { Tag } from "../models/tag";
import { User } from "../models/user";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.type";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    if (!connected) {
      await connectToDatabase();
    }

    const questions = await Question.find(params)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.error(error);
  }
};

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    // Server code here
    if (!connected) {
      await connectToDatabase();
    }

    const { title, content, tags, author, path } = params;

    // Let's create question

    const question = await Question.create({
      title,
      content,
      author,
    });

    // Let's get tags id
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
};
