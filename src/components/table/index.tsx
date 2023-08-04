import { FC } from "react";
import { BiTime } from "react-icons/bi";

import { Song, UIState } from "@/types";
import { Row } from "./row";
import { TableError } from "./error";
import { TableLoading } from "./loading";
import { DropdownItem } from "../dropdownMenu/types";

export interface TableProps {
  songs: Array<Song>;
  state: UIState;
  dropdownItems: Array<DropdownItem>;
  onClickRating: (id: number, rating: number) => void;
}

export const Table: FC<TableProps> = ({
  songs,
  state,
  dropdownItems,
  onClickRating,
}) => {
  if (state == UIState.error) return <TableError />;

  if (state == UIState.loading) return <TableLoading />;

  if (state == UIState.success)
    return (
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-gray-900">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-4 py-4 text-left text-sm font-semibold text-white"
              >
                #
              </th>
              <th
                scope="col"
                className="py-4 text-left text-sm font-semibold text-white"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-sm font-semibold text-white"
              >
                Album
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-sm font-semibold text-white"
              >
                Genre
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-sm font-semibold text-white"
              >
                Date Added
              </th>
              <th
                scope="col"
                className="px-3 pl-9 py-4 text-left text-sm font-semibold text-white"
              >
                Rating
              </th>
              <th
                scope="col"
                className="px-3 py-4 text-left text-sm font-semibold text-white"
              >
                <BiTime className={"w-6 h-6"} />
              </th>
              <th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {songs.map((song) => (
              <Row
                song={song}
                key={song.id}
                dropdownItems={dropdownItems}
                onClickRating={onClickRating}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
};
