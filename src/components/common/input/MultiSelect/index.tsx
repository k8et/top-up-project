import { IHandlerChange } from "@/hooks/useForm";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Icon from "../../Icon";

interface ISelectInputProps {
  label?: string;
  error?: string;
  value: string | boolean;
  placeholder?: string;
  search?: boolean;
  searchPlaceholder?: string;
  name: string;
  options: IData[];
  className?: string;
  onChange: ({ name, value }: IHandlerChange) => void;
  hint?: React.ReactNode;
  setForm?: any
}

interface IData {
  name: string;
  value: string | boolean;
}

const MultiSelect = (props: ISelectInputProps) => {
  const { label, value,setForm, placeholder, search, searchPlaceholder, name, options, className, onChange, error } = props;
  const { hint } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const [searchForm, setSearchForm] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(["0"]);
  const val = (item: any) => {
    if (!search) {
      onChange?.({ name, value: item.value });
    } else {
      if (selectedValues.includes(item.value as any)) {
        if (selectedValues.length === 1) {
          setSelectedValues([]);
        } else {
          setSelectedValues(selectedValues.filter(val => val !== item.value));
        }
      } else {
        if (item.value === "0") {
          setSelectedValues(["0"]);
        } else {
          setSelectedValues([...selectedValues.filter(val => val !== "0"), item.value as string]);
        }
      }
    }
  };
  const selectName = options?.find((f) => {
    if (typeof value === "boolean") return f.value === value;
    return `${f.value}` === `${value}`;
  });
  const filteredList =
    searchForm.length > 0
      ? options?.filter((f) => {
        return f.name.toLowerCase().includes(searchForm.toLowerCase());
      })
      : options;
  useEffect(() => {
    setForm((prevForm: any) => {
      return {
        ...prevForm,
        server: selectedValues
      };
    });
  }, [selectedValues]);

  return (
    <div className={"flex flex-col gap-[6px]" + (className ? " " + className : "")}>
      {!!label && <p className="font-medium text-[14px] text-grey-#3">{label}</p>}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className={
          "openMenu relative flex justify-start w-full border border-grey-#4 px-[16px] py-[12px] bg-white" +
          (openMenu ? " rounded-t-[10px]" : " rounded-[10px]")
        }
      >
        {selectedValues.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedValues.map((val: any, index) => (
              <div key={index}>
                {!(val === "0") ?
                  <span key={index} className="border bg-grey-#4 rounded px-2 py-1 text-xs">{val}</span>
                  :
                  <span>Для всех серверов</span>
                }
              </div>
            ))}
          </div>
        ) : (
          selectName?.name || (placeholder &&
            <span className="text-blackDark dark:text-white">{placeholder}</span>) || (
            <pre> </pre>
          )
        )}
        <div className="absolute right-[14px] top-0 bottom-0 flex items-center gap-2">
          <div className={"duration-300" + (openMenu ? " rotate-180" : " -rotate-0")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.75024 12C2.75024 17.108 6.89124 21.25 12.0002 21.25C17.1082 21.25 21.2502 17.108 21.2502 12C21.2502 6.892 17.1082 2.75 12.0002 2.75C6.89124 2.75 2.75024 6.892 2.75024 12Z"
                fill="white"
              />
              <path
                d="M8.52905 10.5576L12.0001 14.0436L15.4711 10.5576"
                stroke="#1F1F21"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {!!hint && <div className="relative hint">{hint}</div>}
        </div>
      </button>
      <div className="w-full relative z-10">
        {openMenu && (
          <div
            className={
              "z-50 absolute w-full border-[1px] border-grey-#4 bg-white dark:bg-blackDark divide-y divide-graySecond dark:divide-white" +
              (openMenu ? " rounded-b-[10px]" : " rounded-[10px]")
            }
          >
            {search && (
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder={searchPlaceholder || ""}
                  className="inputSearch w-full p-[15px] bg-[#E6E6E6] dark:bg-blackDark border-none pl-[50px] focus:border-none text-[13px]"
                  onChange={({ target }) => setSearchForm(target.value)}
                />
                <Icon
                  name="search"
                  className={
                    "absolute top-[50%] left-[20px] w-5 h-5 duration-200 translate-y-[-50%]" +
                    (openMenu ? " opacity-100" : " opacity-0")
                  }
                />
              </div>
            )}
            <div
              onClick={() => {
                setSearchForm("");
                setOpenMenu(false);
              }}
              className={`max-h-[185px] overflow-y-auto divide-y divide-graySecond ${style.options}`}>
              {(!options || filteredList?.length === 0) && (
                <div className="py-[15px] px-[20px] cursor-pointer text-[13px] text-center">Ничего не найдено</div>
              )}
              {filteredList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => val(item)}
                  className={`py-[15px] px-[20px] cursor-pointer text-[13px] ${
                    selectedValues.includes(item.value as string) ? "bg-grey-#4 text-white" : ""
                  }`}
                >
                  <div>
                    {item.name ? item.name : <p className="opacity-0">.</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};


export default MultiSelect;
