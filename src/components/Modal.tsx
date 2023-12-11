import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

// type TransitionVarian = 'botom-to-top' | 'right-to-left';

type ModalProps = {
  show: boolean;
  children?: ReactNode;
  onClose: () => void;
  backdropStatic?: boolean;
  size?: 'sm' | 'lg';
  backdropNone?: boolean;
};

// const getTransition = (varian: TransitionVarian) => {
//   switch (varian) {
//     case 'botom-to-top':
//       return {
//         enter: 'transform transition ease-out duration-300',
//         enterFrom: '-translate-y-[10rem]',
//         enterTo: 'translate-y-0',
//         leave: 'transform transition ease-in duration-300',
//         leaveFrom: 'translate-y-0',
//         leaveTo: ' -translate-y-[10rem]',
//       };
//   }
// };
function Modal({
  show = false,
  children,
  onClose,
  backdropStatic = false,
  size,
  backdropNone,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(show ? show : false);
  const closeButtonRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  const handleOpenChange = (opened: boolean) => {
    if (backdropStatic) return null;

    if (!opened && isOpen !== undefined) {
      // controlled component
      onClose();
      return;
    }
    // un-controlled component
    setIsOpen(show);
  };

  const sizeOptions = size === 'lg' ? 'max-w-4xl' : size === 'sm' ? 'max-w-sm' : 'max-w-xl';

  return (
    <React.Fragment>
      <Transition.Root show={isOpen} as={Fragment} appear>
        <Dialog
          onClose={handleOpenChange}
          initialFocus={closeButtonRef}
          className="relative z-[9999999]"
        >
          {backdropNone ? null : (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm transition-opacity"
                aria-hidden="true"
              />
            </Transition.Child>
          )}

          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center px-4 py-6">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-500"
                enterFrom="translate-y-[3rem]"
                enterTo="translate-y-0"
                leave="transform transition ease-in duration-300"
                leaveFrom="translate-y-0"
                leaveTo=" translate-y-[10rem]"
              >
                <Dialog.Panel className={clsx('mx-auto w-full rounded-lg', sizeOptions)}>
                  <div className=" pt-3 pb-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </React.Fragment>
  );
}

export default Modal;
