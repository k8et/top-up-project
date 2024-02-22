import React from "react";

interface IModalWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const ModalWrapper = (props: IModalWrapperProps) => {
  const { className, children } = props;
  return (
    <div className={"flex flex-col gap-[20px] p-[24px] bg-white rounded-[12px]" + (className ? " " + className : "")}>
      {children}
    </div>
  );
};

export default ModalWrapper;
