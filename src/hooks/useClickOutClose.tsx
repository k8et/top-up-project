import { getRandomNumberId } from "@/utils/randomId";
import { useEffect, useMemo, useState } from "react";

interface useClickOutCloseProps {
  onClickOut: (arg0?: boolean) => void;
  isOpen: boolean;
  name?: string;
}

const useClickOutClose = (props: useClickOutCloseProps) => {
  const { onClickOut, isOpen, name } = props;
  const id = useMemo(() => getRandomNumberId(), []);
  const noClose = name ? name : `no-close-container-${id}`;

  const handlerClickOutSide = (event: any) => {
    const { target } = event;
    if (target?.closest(`.${noClose}`) === null) onClickOut?.();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handlerClickOutSide);
      return () => document.removeEventListener("click", handlerClickOutSide);
    }
  }, [isOpen]);

  return { noClose };
};

export default useClickOutClose;
