"use server";

import { connectToDatabase, connected } from "../database";
import { User } from "../models/user";
import { GetUserByIdParams } from "./shared.type";

// export const createUser = async (params) => {
//   try {
//     // Server code here
//     if (!connected) {
//       await connectToDatabase();
//     }

//     const { title, content, tags, author, path } = params;

//     // Let's create question

//     const question = await QuestionModel.create({
//       title,
//       content,
//       author,
//     });

//     // Let's get tags id
//     const tagDocuments = [];

//     for (const tag of tags) {
//       const existingTag = await TagModel.findOneAndUpdate(
//         {
//           name: { $regex: new RegExp(`^${tag}$`, "i") },
//         },
//         {
//           $setOnInsert: { name: tag },
//           $push: { question: question._id },
//         },
//         {
//           upsert: true,
//           new: true,
//         }
//       );

//       tagDocuments.push(existingTag._id);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    if (!connected) {
      await connectToDatabase();
    }
    const { userId } = params;
    const user = User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
  }
};
