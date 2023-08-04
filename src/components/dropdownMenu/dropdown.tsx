import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

import { DropdownItem } from "./types";

export interface DropdownProps {
  id: number;
  items: Array<DropdownItem>;
}

export const Dropdown: FC<DropdownProps> = ({ id, items }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {items.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-600 text-gray-200" : "text-gray-300",
                    "w-full block px-4 py-2 text-sm text-left"
                  )}
                  onClick={() => item.event(id)}
                >
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  );
};
