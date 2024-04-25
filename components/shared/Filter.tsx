"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

interface FilterProps {
  filters: { name: string; value: string }[];
  className: string;
  containerClass: string;
}

const Filter = ({ filters, className, containerClass }: FilterProps) => {
  // const [state, setState] = useState()
  // useEffect(() => {

  // }, [])
  return (
    <div className={`relative ${containerClass}`}>
      <Select>
        <SelectTrigger
          className={`${className} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          onChange={() => console.log("chnaged")}
        >
          <div className="line-clamp-1">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                value={filter.value}
                key={filter.value}
                onChange={() => console.log("select")}
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
