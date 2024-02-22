import Icon from "@/components/common/Icon";
import { getAuth, logOut } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const router = useRouter();
  const currentUser = useSelector(getAuth());
  const dispatch = useAppDispatch();

  const handlerLogOut = () => {
    dispatch(logOut())
      .unwrap()
      .finally(() => router.push("/login"));
  };

  return (
    <div className="group relative flex flex-col w-[240px] ">
      <div className="text-[14px] flex flex-col items-end py-[12px] px-[16px] w-full transition duration-200 group-hover:rounded-t-[8px] border border-transparent group-hover:border-[#F2F4F7] border-b-0 group-hover:bg-white">
        <div className="font-semibold text-grey-#1">{currentUser.login ? currentUser.login : <pre> </pre>}</div>
        <div className="text-grey-#3">{currentUser.email ? currentUser.email : <pre> </pre>}</div>
      </div>
      <div className="relative">
        <div className="absolute z-10 top-0 transition duration-200 opacity-0 hidden  group-hover:block group-hover:opacity-100 w-full bg-white border rounded-b-[8px] border-[#F2F4F7] border-t-0">
          <p className="w-full items-center flex gap-[12px] py-[12px] border-t border-[#F2F4F7] hover:bg-[#F2F4F7] px-[16px] transition duration-200">
            <Icon name="setting" className="!w-[30px] !h-[30px]" />
            <span className="text-[14px] font-medium">Настройки</span>
          </p>
          <p className="w-full items-center flex gap-[12px] py-[12px] px-[16px] border-t border-[#F2F4F7] hover:bg-[#F2F4F7] transition duration-200">
            <Icon name="help-circle" className="!w-[16px] !h-[16px]" />
            <span className="text-[14px] font-medium">Поддержка</span>
          </p>
          <button
            onClick={handlerLogOut}
            type="button"
            className="w-full items-center flex gap-[12px] py-[12px] px-[16px]  border-t border-[#F2F4F7] hover:bg-[#F2F4F7] transition duration-200"
          >
            <Icon name="logout" className="!w-[16px] !h-[16px]" />
            <span className="text-[14px] font-medium">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
