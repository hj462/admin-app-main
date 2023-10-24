import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Loader from "./Loader";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type dropdownTypes = {
  label: string;
  options: Array<string>;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  isLoading?: Boolean;
  getSelectedId?: any;
  disable?: boolean;
  selectedValue?: string;
  setSelectedValue?: any;
  regulatory?: Boolean;
  className?: string;
};

const Dropdown = ({
  label,
  options,
  onScroll,
  isLoading,
  getSelectedId,
  disable,
  selectedValue,
  setSelectedValue,
  regulatory,
  className,
}: dropdownTypes) => {
  return (
    <>
      <p className="leading-5 text-sm font-medium text-[#464F60] mb-2">
        {label}
      </p>
      <Menu as="div" className="relative text-left">
        <Menu.Button
          disabled={disable}
          className={
            disable
              ? ` ${className} cursor-not-allowed inline-flex w-full justify-between rounded-md border border-gray-300 bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100`
              : ` ${className} inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100`
          }
        >
          {selectedValue ? selectedValue : "Select..."}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            onScroll={onScroll}
            className="absolute right-0 z-10 mt-2 w-full h-32 overflow-y-scroll overflow-x-hidden origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {isLoading ? (
              <Loader />
            ) : (
              <div className="py-1">
                {options?.map((item: any, idx: any) => (
                  <Menu.Item key={idx}>
                    {({ active }) => (
                      <p
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm truncate"
                        )}
                        onClick={() => {
                          {
                            regulatory
                              ? setSelectedValue(item.authoritativeBody)
                              : setSelectedValue(item.key);
                          }
                          getSelectedId(item.id);
                        }}
                      >
                        {regulatory ? (
                          <span>{item.authoritativeBody}</span>
                        ) : (
                          <span>
                            {item.key} | {item.description}
                          </span>
                        )}
                      </p>
                    )}
                  </Menu.Item>
                ))}
              </div>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Dropdown;
