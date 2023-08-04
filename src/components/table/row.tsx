import { FC, useState } from "react";
import classNames from "classnames";

import { DropdownItem } from "../dropdownMenu/types";
import { Rating } from "../rating";
import { Song } from "@/types";
import { DropdownMenu } from "../dropdownMenu";

export interface RowProps {
  dropdownItems: Array<DropdownItem>;
  onClickRating: (id: number, rating: number) => void;
  song: Song;
}

export const Row: FC<RowProps> = ({ dropdownItems, onClickRating, song }) => {
  const [isHover, setIsHover] = useState(false);

  const toCustomDate = (date: Date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Ap",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = monthNames[date.getMonth()];

    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  function millisToMinutesAndSeconds(ms: number) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  }

  const onMouseEnter = () => setIsHover(true);

  const onMouseLeave = () => setIsHover(false);

  return (
    <tr
      key={song.id}
      className={classNames(
        "transition-colors duration-100",
        isHover ? "bg-gray-800" : "bg-gray-900"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <td className="whitespace-nowrap py-2 pl-4 text-sm font-sm text-white">
        {song.id}
      </td>
      <td className="flex flex-row whitespace-nowrap py-2 gap-2">
        <img src={song.image} width={40} height={40} />
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-300 font-bold"> {song.title}</span>
          <span className="text-xs text-gray-300"> {song.artist}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
        {song.album}
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
        {song.genre}
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
        {toCustomDate(song.date)}
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
        <Rating id={song.id} rate={song.rating} onClick={onClickRating} />
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
        {millisToMinutesAndSeconds(song.duration)}
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm">
        <DropdownMenu id={song.id} isHover={isHover} items={dropdownItems} />
      </td>
    </tr>
  );
};
