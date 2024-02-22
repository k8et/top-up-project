"use client";
import { IHandlerChange } from "@/hooks/useForm";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from "../../Icon";
import Label from "../../text/Label";
import { SizeComponent } from "@/types";

export interface ITextInputProps {
  placeholder?: string;
  label?: string;
  isError?: boolean;
  error?: string;
  autoComplete?: string;
  value: string;
  name: string;
  onChange: ({ name, value }: IHandlerChange) => void;
  type?: string;
  isSearch?: boolean;
  classNameInput?: string;
  isCopy?: boolean;
  suffix?: React.ReactNode | string;
  after?: React.ReactNode;
  size?: SizeComponent;
  classNameDiv?: string;
}

const TextInput = (props: ITextInputProps) => {
  const { placeholder, label, value, name, onChange, type = "text", autoComplete } = props;
  const { isSearch, suffix, classNameInput,classNameDiv, after, error, isError = false, size = "medium" } = props;
  const suffixRef = useRef<any>(null);
  const [widthSuffix, setWidthSuffix] = useState(0);
  const inputPadding = 16;
  const gapSuffix = 2;

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange?.({ name, value });
  };

  useEffect(() => {
    const suffixWidth = suffixRef.current?.offsetWidth;
    if (widthSuffix !== suffixWidth) setWidthSuffix(suffixWidth);
  }, [suffix]);

  const sizeClass = (s: SizeComponent | undefined) => {
    if (s === "big") return " py-[12px] px-[16px]";
    if (s === "medium") return " py-[10px] px-[14px]";
    if (s === "mini") return " py-[12px] px-[8px]";
  };

  return (
    <div className="flex flex-col gap-[6px]">
      {label && <Label>{label}</Label>}
      <div className={"rounded-[8px] transition duration-200 hover:shadow-[0px_0px_0px_4px_#EBEDFF]" +(classNameDiv ? " " + classNameDiv : "")} >
        <label
          className={
            "relative flex items-center gap-[8px] border rounded-[8px] bg-white overflow-hidden transition duration-200" +
            sizeClass(size) +
            (classNameInput ? " " + classNameInput : "") +
            (isError
              ? " border-error shadow-[inset_0_0px_0px_1px_#CA4646] text-error"
              : " border-grey-#4 focus-within:shadow-[inset_0_0px_0px_2px_rgba(52,64,84,1)]")
          }
        >
          {isSearch && <Icon name="search" className="text-grey-#3 !w-[20px] !h-[20px]" />}
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={handlerChange}
            className="placeholder:text-grey-#3 outline-none w-full"
            style={{
              paddingRight: suffix ? widthSuffix + gapSuffix * 2 : inputPadding
            }}
          />
          <div
            className="absolute top-0 bottom-0 left-0 right-0 flex items-center invisible select-none pointer-events-none"
            style={{
              gap: gapSuffix,
              padding: inputPadding
            }}
          >
            <span className="overflow-hidden">{value || placeholder}</span>
            <span ref={suffixRef} className="flex items-center h-full visible text-grey-#3">
              {+value === 0 ? suffix : value && suffix}
            </span>
          </div>
          {!!after && after}
          {/* {isCopy && <CopyButton value={value} />} */}
        </label>
      </div>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default React.memo(TextInput);
