import { FC } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

export interface TableErrorProps {}

export const TableError: FC<TableErrorProps> = ({}) => {
  return (
    <div className="flex flex-col items-center w-full rounded-lg border-2 border-dashed border-gray-200 py-16">
      <div className="flex flex-col max-w-md items-center text-center">
        <MdOutlineErrorOutline className={"w-12 h-12 text-red-400"} />
        <span className="mt-2 block text-sm font-semibold text-gray-300">
          Something has failed.
        </span>
      </div>
    </div>
  );
};
