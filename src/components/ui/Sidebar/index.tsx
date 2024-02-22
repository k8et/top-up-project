"use client";
import Icon from "@/components/common/Icon";
import NavLinkButton from "@/components/common/button/NavLinkButton";
import useResize from "@/hooks/useResize";
import { useEffect, useState } from "react";
import UserInfo from "../UserInfo";

const Sidebar = () => {
  const { isScreenXl } = useResize();
  const [isOpen, setOpen] = useState(true);

  // const { noClose } = useClickOutClose({ isOpen, onClickOut: () => setOpen(!isOpen) });

  useEffect(() => {
    if (!isScreenXl) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isScreenXl]);

  return (
    <>
      <div className={"flex justify-between w-full xl:hidden"} suppressHydrationWarning>
        <button onClick={() => setOpen(!isOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <UserInfo />
      </div>

      {isOpen && (
        <>
          <div
            suppressHydrationWarning
            className="animate-background-modal absolute z-40 inset-0 bg-[#3440544d] backdrop-blur xl:hidden"
          ></div>
          <aside
            suppressHydrationWarning
            className={
              "transition duration-1000 bg-white min-h-screen min-w-[348px] flex flex-col gap-[24px] pt-[24px] xl:pt-[36px] top-0 left-0 absolute z-50 rounded-tr-[25px] rounded-br-[25px] xl:rounded-none border xl:relative"
              //  (!isScreenXl ? "-translate-x-[348px]" : "translate-x-[0px]")
            }
          >
            <div className="pl-[41px] xl:pl-[47px] flex justify-between">
              <button onClick={() => setOpen(!isOpen)} className="p-[5px] pr-[20px] xl:hidden">
                <Icon name="close-light" />
              </button>
            </div>

            <div className={"pl-[26px] xl:pl-[32px] flex flex-col gap-[8px]"}>
              <NavLinkButton to="/" label="Users" icon="users" />
            </div>
          </aside>
        </>
      )}
    </>
  );
};
export default Sidebar;
