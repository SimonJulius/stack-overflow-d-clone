import Filter from "@/components/shared/Filter";
import CommunityListCard from "@/components/shared/cards/CommunityListCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import { Button } from "@/components/ui/button";
import { CommunityPageFilters } from "@/constants/filters";
import { getUsers } from "@/lib/actions/user.action";
import { UserInterface } from "@/types";
import Link from "next/link";
// import Link from "next/link";

const Page = async () => {
  const response = await getUsers({});
  const users = response?.users;
  return (
    <>
      <section
        className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center"
        aria-label="all questions"
      >
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions Here..."
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
        {!users?.length ? (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No User found</p>
            <Link
              href="/sign-up"
              className="mt-2 font-bold text-accent-blue"
            ></Link>
          </div>
        ) : (
          users.map((user: UserInterface) => {
            return <CommunityListCard user={user} key={user._id} />;
          })
        )}
      </section>
    </>
  );
};

export default Page;
