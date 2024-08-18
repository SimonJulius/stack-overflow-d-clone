import Answer from '@/components/forms/Answer'
import Metric from '@/components/shared/Metric'
import ParseHTML from '@/components/shared/ParseHTML'
import RenderTags from '@/components/shared/RenderTags'
import { getQuestionsById } from '@/lib/actions/question.action'
import { formatNumber, getTimestamp } from '@/lib/utils'
import { TagInterface } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface pageProps {
    params: {
        id: string
    }
}

const Page = async ({ params }: pageProps) => {
    const questionPayload = await getQuestionsById({ questionId: params.id })

    return (
        <>
            <div className="flex-start w-full flex-col">
                <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                    <Link className='flex items-center justify-start gap-1' href={questionPayload?.author?.clerkId}>
                        <Image src={questionPayload?.author?.picture} className='rounded-full' width={22} height={22} alt="profile" />
                        <p className="paragraph-semibold text-dark300_light700">{questionPayload?.author?.name}</p>
                    </Link>
                    <div className="flex justify-end">
                        VOTING
                    </div>
                </div>
                <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
                    {questionPayload?.title}
                </h2>
            </div>

            <div className='mb-8 mt-5 flex flex-wrap gap-4'>
                <Metric
                    imgUrl="/assets/icons/clock.svg"
                    value={`asked ${getTimestamp(questionPayload?.createdAt)}`}
                    title=" Asked"
                    alt="clock icon"
                    textStyle="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/message.svg"
                    value={formatNumber(questionPayload?.answers?.length)}
                    title="Answers"
                    alt="Answers"
                    textStyle="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/eye.svg"
                    value={formatNumber(questionPayload?.view)}
                    title="Views"
                    alt="Views"
                    textStyle="small-medium text-dark400_light800"
                />
            </div>
            <ParseHTML data={questionPayload?.content} />
            <div className='mt-8 flex flex-wrap gap-2'>
                {questionPayload?.tags?.map((tag: TagInterface) => (
                    <RenderTags
                        key={tag?._id}
                        _id={tag?._id}
                        name={tag?.name}
                        showCount={false}
                    />
                ))}
            </div>
            <Answer />
        </>
    )
}

export default Page