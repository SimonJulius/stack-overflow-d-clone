import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

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
      <div>
        <HomeFilter />
      </div>
    </>
  );
};

export default page;
