import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";
import React from "react";

const page = async () => {
  const result = await getQuestions({});
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
        {result && result.questions.length ? (
          result.questions.map((question, index) => (
            <QuestionCard
              _id={JSON.stringify(question._id)}
              key={question._id}
              title={question.title}
              tags={JSON.parse(JSON.stringify(question.tags))}
              author={JSON.parse(JSON.stringify(question.author))}
              upvotes={question.upvotes}
              view={question.views}
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
