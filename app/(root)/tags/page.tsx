import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import { Button } from "@/components/ui/button";
import { CommunityPageFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { TagInterface } from "@/types";
import Link from "next/link";

const Page = async () => {
  const { tags } = await getAllTags({});
  return (
    <>
      <section
        className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center"
        aria-label="all questions"
      >
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Tags Here..."
          iconPosition="left"
          className="flex-1"
        />
        <Filter
          filters={CommunityPageFilters}
          className="min-h-[56px] sm:min-w-[170px]"
          containerClass="max-md:flex"
        />
      </section>
      <section className="mt-12 flex flex-wrap gap-4">
        {!tags?.length ? (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No User found</p>
            <Link
              href="/sign-up"
              className="mt-2 font-bold text-accent-blue"
            ></Link>
          </div>
        ) : (
          tags.map((tag: TagInterface) => {
            return (
              <Link
                href={`/tags/${tag._id}`}
                key={tag._id}
                className="shadow-light100_darknone"
              >
                <div className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                  <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                    <p className="paragraph-semibold text-dark300_light900">
                      {tag.name}
                    </p>
                  </div>
                  <p className="small-medium text-dark400_light500 mt-3.5">
                    <span className="body-semibold primary-text-gradient mr-2.5 ">
                      {tag.questions.length}+
                    </span>{" "}
                    Questions
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </>
  );
};

export default Page;
