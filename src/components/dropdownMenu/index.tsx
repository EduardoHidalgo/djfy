import { FC } from "react";
import { Menu } from "@headlessui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Dropdown, DropdownProps } from "./dropdown";
import classNames from "classnames";

export interface DropdownMenuProps extends DropdownProps {
  isHover: boolean;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ id, isHover, items }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={classNames(
            "flex items-center rounded-full",
            isHover ? "text-gray-300" : "text-transparent"
          )}
        >
          <span className="sr-only">Open options</span>
          <BiDotsHorizontalRounded className={"w-6 h-6"} />
        </Menu.Button>
      </div>
      <Dropdown id={id} items={items} />
    </Menu>
  );
};
