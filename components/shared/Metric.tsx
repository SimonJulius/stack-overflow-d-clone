// import React, {ReactNode, useState, useEffect} from 'react'

import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  value: number | string;
  title: string;
  alt: string;
  textStyle?: string;
  href?: string;
  isAuthor?: boolean;
}

const MetricContents = ({
  imgUrl,
  value,
  title,
  href,
  alt,
  textStyle,
  isAuthor,
}: MetricProps) => {
  return (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        height={16}
        width={16}
        className={`mr-1 rounded-full object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`flex items-center gap-1 ${textStyle}`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );
};

const Metric = ({
  imgUrl,
  value,
  title,
  href,
  alt,
  textStyle,
  isAuthor,
}: MetricProps) => {
  // const [state, setState] = useState()

  if (href) {
    return (
      <Link href={href} className="flex-center flex-wrap gap-1">
        <MetricContents
          imgUrl={imgUrl}
          value={value}
          title={title}
          alt={alt}
          textStyle={textStyle}
          isAuthor={isAuthor}
        />
      </Link>
    );
  }

  return (
    <div className="flex-center flex-wrap gap-1">
      <MetricContents
        imgUrl={imgUrl}
        value={value}
        title={title}
        alt={alt}
        textStyle={textStyle}
        isAuthor={isAuthor}
      />
    </div>
  );
};

export default Metric;
