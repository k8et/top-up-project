import { useEffect } from "react";

interface IProps {
  isOpen: boolean;
}

export const useDisableBodyScroll = (props: IProps) => {
  const { isOpen } = props;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);
};
