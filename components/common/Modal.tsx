import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import closeIcon from "../../assets/close.png";
import Button from "./Button";

type modalTypes = {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  ModalContent: any;
  update?: boolean;
  formSubmit?: (keepModalOpen: boolean) => void;
  showFooterButtons?: boolean;
  deleteRow?: boolean;
};

export default function Modal({
  open,
  setOpen,
  ModalContent,
  title,
  update,
  formSubmit,
  showFooterButtons = true,
  deleteRow,
}: modalTypes) {
  const cancelButtonRef = useRef(null);
  const [keepModalOpen, setKeepModalOpen] = useState<boolean>(false);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-[800px]">
                <div className="bg-white">
                  <div className="">
                    <div className="flex justify-between items-center p-6 border-b-2">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold text-[#212529]"
                      >
                        {title}
                      </Dialog.Title>
                      <div>
                        <Image
                          src={closeIcon}
                          alt="close"
                          onClick={() => setOpen(false)}
                          className="cursor-pointer"
                          data-testid="modal-open"
                        />
                      </div>
                    </div>
                    <div className="p-6">{ModalContent}</div>
                  </div>
                </div>
                <div
                  className={
                    update || deleteRow || !showFooterButtons
                      ? "justify-end border-t-2 px-5 py-4 flex items-center"
                      : " border-t-2 px-5 py-4 flex justify-between items-center"
                  }
                >
                  {!update && !deleteRow && showFooterButtons && (
                    <div className="flex">
                      <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        id="another"
                        onChange={() => setKeepModalOpen(!keepModalOpen)}
                        data-testid="modal-change"
                      />
                      <label
                        className="text-[#212529] text-base font-normal"
                        htmlFor="another"
                      >
                        Add another requirement
                      </label>
                    </div>
                  )}
                  <div>
                    <Button
                      title="Cancel"
                      className="h-9 bg-[#F8F9FA] text-[#212529] mr-3"
                      onClick={() => setOpen(false)}
                      onRef={cancelButtonRef}
                    />
                    <Button
                      title={update ? "Update" : deleteRow ? "Delete" : "Add"}
                      onClick={() => formSubmit && formSubmit(keepModalOpen)}
                      className="h-9 bg-[#C8B568] text-white"
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
