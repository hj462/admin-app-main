import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import Loader from "./Loader";

type overlayTypes = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  content: any;
  onSubmit: () => void;
  loading?: boolean;
};

export default function SidebarOverlay({
  open,
  setOpen,
  title,
  content,
  onSubmit,
  loading,
}: overlayTypes) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6 flex items-center justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div
                        onClick={() => setOpen(false)}
                        data-testid="close-overlay"
                      >
                        <XMarkIcon
                          className="h-6 w-6 cursor-pointer"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    {loading ? (
                      <Loader />
                    ) : (
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {content}
                      </div>
                    )}
                    <div className="flex justify-end items-center px-5">
                      <Button
                        title="Update"
                        className="h-10 border mr-3 border-[#519C66] hover:bg-[#519C66] hover:text-white transition-all delay-200 ease-in-out text-[#519C66]"
                        onClick={onSubmit}
                      />
                      <Button
                        title="Cancel"
                        className="h-10 border border-[#CC5F5F] hover:bg-[#CC5F5F] hover:text-white transition-all delay-200 ease-in-out text-[#CC5F5F]"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
