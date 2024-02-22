import { useDisableBodyScroll } from "@/hooks/useDisableBodyScroll";
import useResize from "@/hooks/useResize";
import React, { useEffect, useState } from "react";

interface IModalWindowProps {
  children: React.ReactNode;
  onClickOut?: () => void;
  className?: string;
  width?: number;
  isOpen: boolean;
  bgClassName?: string;
}

const ModalWindow = (props: IModalWindowProps) => {
  const { children, isOpen, className, width, bgClassName } = props;
  const { widthScreen } = useResize();
  useDisableBodyScroll({ isOpen });

  const [size, setSize] = useState({
    width: width ? width : 745,
    value: width ? `${width}px` : "745px"
  });

  useEffect(() => {
    if (widthScreen <= size.width && size.value !== "auto") setSize(state => ({ ...state, value: "auto" }));
    else if (widthScreen >= size.width && size.value === "auto") {
      setSize(state => ({ ...state, value: width ? `${width}px` : "745px" }));
    }
  }, [widthScreen]);

  return (
    isOpen && (
      <div
        className={
          "animate-background-modal fixed inset-0 z-[9998] overflow-y-auto backdrop-blur-md bg-[#344054ab]" +
          (bgClassName ? " " + bgClassName : "")
        }
      >
        <div className={"relative flex justify-center w-full items-center" + (className ? ` ${className}` : "")}>
          <div
            className="my-10 opacity-0 animate-open-modal relative dark:shadow-sm dark:shadow-graySecond"
            style={{ width: size.value }}
          >
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default ModalWindow;
