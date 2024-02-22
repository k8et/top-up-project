"use client";
import Table from "@/components/common/Table";
import DisplayUserStatus from "@/components/common/display/DisplayUserStatus";
import TextInput from "@/components/common/input/TextInput";
import Sidebar from "@/components/ui/Sidebar";
import CreateUserModal from "@/components/ui/modal/CreateUserModal";
import UpdateUserModal from "@/components/ui/modal/UpdateUserModal";
import isAuth from "@/hoc/isAuth";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import { getUserList } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

const initialData = {
  search: "",
  type: "users"
};

function Home() {
  const userList = useSelector(getUserList());
  const { form, handlerChange } = useForm({ data: initialData });
  const { isOpen, handlerToggle, currentData } = useModal();
  const filterSearch = form.search
    ? userList.filter((item: any) => item.name.toLowerCase().indexOf(form.search.toLowerCase()) >= 0)
    : userList;

  return (
    <div className="flex grow flex-col xl:flex-row bg-blue-#6 p-[16px] xl:p-0 gap-[32px] xl:gap-0">
      <Sidebar />
      <main className="w-full xl:py-[34px] xl:px-[36px]">
        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-[34px]">
            <div className="flex justify-between flex-col gap-[16px] sm:flex-row">
              <TextInput
                size="big"
                name="search"
                isSearch
                value={form.search}
                placeholder="Find on name"
                onChange={handlerChange}
              />
              <CreateUserModal />
            </div>
            <Table
              className="text-[14px]"
              data={filterSearch}
              onClick={handlerToggle}
              columns={[
                { label: "Name", body: (item: { name: any }) => item.name },
                {
                  className: "max-w-[15%]",
                  label: "Token",
                  body: (item: { token: any }) => <DisplayUserStatus value={item.token} />
                },
                {
                  className: "max-w-[15%]",
                  label: "Username bot",
                  body: (item: { username: any }) => <DisplayUserStatus value={item.username} />
                },
                {
                  className: "max-w-[15%]",
                  label: "ID user",
                  body: (item: { id_user: any }) => (
                    <span className="text-grey-#3">{(item.id_user)}</span>
                  )
                }
              ]}
            />
            <UpdateUserModal data={currentData} handlerToggle={handlerToggle} isOpen={isOpen} />
          </div>
        </div>
      </main>
    </div>
  );
}
export default isAuth(Home);
