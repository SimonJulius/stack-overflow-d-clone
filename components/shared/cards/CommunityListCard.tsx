import { Badge } from "@/components/ui/badge";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import RenderTags from "../RenderTags";

interface CommunityListCardProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const CommunityListCard = async ({ user }: CommunityListCardProps) => {
  const userInteractedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone max-sx:min-w-full w-full xs:w-[260px]"
    >
      <div className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="profile picture"
          width={100}
          height={100}
          className="rounded-full"
          style={{
            objectFit: "cover",
            height: "100px",
          }}
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
          <div className="mt-5">
            {userInteractedTags && userInteractedTags.length > 0 ? (
              <div className="flex items-center gap-1">
                {userInteractedTags.map((tag) => (
                  <RenderTags
                    key={tag._id}
                    _id={tag._id.toString()}
                    name={tag.name}
                  />
                ))}
              </div>
            ) : (
              <Badge>No tags yet</Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CommunityListCard;
