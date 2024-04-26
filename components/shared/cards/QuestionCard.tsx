"use client";
import Link from "next/link";
// import React, {ReactNode, useState, useEffect} from 'react'
import RenderTags from "../RenderTags";
import Metric from "../Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";
// import Image from "next/image";

interface QuestionCardProps {
  _id: number;
  title: string;
  tags: { _id: string; name: string }[];

  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  view: number;
  answers: object[];
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  view,
  answers,
  createdAt,
}: QuestionCardProps) => {
  // const [state, setState] = useState()

  return (
    <div className="card-wrapper mt-6 rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={"/assets/icons/user.svg"}
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          alt="user"
          textStyle="body-medium text-dark400_light800"
          href={`/profile/${author._id}`}
          isAuthor
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          value={formatNumber(upvotes)}
          title="Votes"
          alt="Upvotes"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          value={formatNumber(answers.length)}
          title="Answers"
          alt="Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          value={formatNumber(view)}
          title="Views"
          alt="Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
