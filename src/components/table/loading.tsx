import { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export interface TableLoadingProps {}

export const TableLoading: FC<TableLoadingProps> = ({}) => {
  return (
    <div className="flex flex-col items-center w-full rounded-lg border-2 border-dashed border-gray-200 py-16">
      <div className="flex flex-col max-w-md items-center text-center">
        <AiOutlineLoading className={"w-12 h-12 animate-spin text-gray-200"} />
        <span className="mt-2 block text-sm font-semibold text-gray-300">
          Loading your liked songs on Spotify, please wait.
        </span>
      </div>
    </div>
  );
};
