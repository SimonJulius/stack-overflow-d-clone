import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: 1,
    title: "How can I improve my programming skills?",
    tags: [
      { _id: "1", name: "programming" },
      { _id: "2", name: "learning" },
    ],
    author: {
      _id: "author_id_1",
      name: "Alice Smith",
      picture: "alice.jpg",
    },
    upvotes: 15,
    view: 2600000,
    answers: [],
    createdAt: new Date("2024-04-25T12:00:00Z"),
  },
  {
    _id: 2,
    title: "What are some good books for learning JavaScript?",
    tags: [
      { _id: "3", name: "JavaScript" },
      { _id: "4", name: "books" },
    ],
    author: {
      _id: "author_id_2",
      name: "Bob Johnson",
      picture: "bob.jpg",
    },
    upvotes: 25,
    view: 300,
    answers: [],
    createdAt: new Date("2024-04-24T12:00:00Z"),
  },
  {
    _id: 3,
    title: "How do I prepare for technical interviews?",
    tags: [
      { _id: "5", name: "interviews" },
      { _id: "6", name: "preparation" },
    ],
    author: {
      _id: "author_id_3",
      name: "Charlie Brown",
      picture: "charlie.jpg",
    },
    upvotes: 35,
    view: 400,
    answers: [],
    createdAt: new Date("2024-04-23T12:00:00Z"),
  },
  {
    _id: 4,
    title: "What are the best practices for responsive web design?",
    tags: [
      { _id: "7", name: "web design" },
      { _id: "8", name: "responsive" },
    ],
    author: {
      _id: "author_id_4",
      name: "Diana Patel",
      picture: "diana.jpg",
    },
    upvotes: 45,
    view: 500,
    answers: [],
    createdAt: new Date("2024-04-22T12:00:00Z"),
  },
  {
    _id: 5,
    title: "How can I start a career in data science?",
    tags: [
      { _id: "9", name: "data science" },
      { _id: "10", name: "career" },
    ],
    author: {
      _id: "author_id_5",
      name: "Evan Rodriguez",
      picture: "evan.jpg",
    },
    upvotes: 55,
    view: 600,
    answers: [],
    createdAt: new Date("2024-04-21T12:00:00Z"),
  },
];

const page = () => {
  return (
    <>
      <section
        className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center"
        aria-label="all questions"
      >
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions Here..."
          iconPosition="left"
          className="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          className="min-h-[56px] sm:min-w-[170px]"
          containerClass="hidden max-md:flex"
        />
      </section>
      <section>
        <HomeFilter />
      </section>
      <section aria-label="questions">
        {questions.length ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              view={question.view}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title={"There’s no question to show"}
            description={` Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡`}
            link={"/ask-question"}
            linkTitle={"Ask a question"}
          />
        )}
      </section>
    </>
  );
};

export default page;
