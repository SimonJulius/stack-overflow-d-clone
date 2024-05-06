"use server";

import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "@/types/server.type";
import { connectToDatabase, connected } from "../database";
import { User } from "../models/user";
import { GetUserByIdParams } from "./shared.type";
import { revalidatePath } from "next/cache";
import { Question } from "../models/question";

export const createUser = async (userData: CreateUserParams) => {
  try {
    if (!connected) {
      await connectToDatabase();
    }

    const { clerkId, name, username, picture, email } = userData;

    const newUser = User.create({ clerkId, name, username, picture, email });
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (userData: UpdateUserParams) => {
  try {
    if (!connected) {
      await connectToDatabase();
    }
    await User.findOneAndUpdate(
      { clerkId: userData.clerkId },
      userData.updateData,
      {
        new: true,
      }
    );
    revalidatePath(userData.path);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (userData: DeleteUserParams) => {
  try {
    if (!connected) {
      await connectToDatabase();
    }

    const user = await User.findOne({ clerkId: userData.clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // TODO: delete every of the user's past interactions with the app.

    // Questions
    // const userQuestionIds = await Question.find({author: user._id}).distinct('_id')

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete({ _id: user._id });
    return deletedUser;
  } catch (error) {
    console.error(error);
  }
};

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
