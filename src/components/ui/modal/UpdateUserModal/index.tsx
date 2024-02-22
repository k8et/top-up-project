import Icon from "@/components/common/Icon";
import Button from "@/components/common/button/Button";
import TextInput from "@/components/common/input/TextInput";
import ModalWindow from "@/components/common/modal/ModalWindow";
import ModalWrapper from "@/components/common/wrapper/ModalWrapper";
import useForm from "@/hooks/useForm";
import { deleteUser, getUserLoading, updateUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { ObjectData } from "@/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface IUpdateUserModalProps {
  isOpen: boolean;
  handlerToggle: () => void;
  data: ObjectData;
}

const initialForm = {
  name: "",
  token: "",
  id_user: "",
  username: ""
};

const validConfig = {
  name: { isRequired: "" },
  token: { isRequired: "" },
  id_user: { isRequired: "" },
  username: { isRequired: "" }
};

const UpdateUserModal = (props: IUpdateUserModalProps) => {
  const { data, isOpen, handlerToggle } = props;
  const isLoading = useSelector(getUserLoading());
  const { form, error, isValid, setForm, handlerChange, handlerSubmit } = useForm({
    data: initialForm,
    onSubmit,
    validConfig
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(data).length > 0) setForm({ ...initialForm, ...data });
  }, [data]);

  function onSubmit(data: any) {
    dispatch(updateUser(data));
    handlerToggle();
  }

  const handlerDelete = () => {
    console.log(data);

    if (data?.user_id) dispatch(deleteUser(data?.user_id));
    handlerToggle();
  };

  return (
    <>
      <ModalWindow isOpen={isOpen} onClickOut={handlerToggle} width={480}>
        <ModalWrapper>
          <div className="flex justify-between items-center">
            <div>Editing a user</div>
            <button onClick={handlerToggle}>
              <Icon name="close-light" className="w-[32px] h-[32px]" />
            </button>
          </div>
          <div className="flex flex-col gap-[6px]">
            <TextInput
              label="Name"
              onChange={handlerChange}
              value={form.name}
              name="name"
              error={error.name}
            />
            <TextInput
              label="Token"
              onChange={handlerChange}
              value={form.token}
              name="token"
              error={error.token}
            />
            <TextInput
              label="Username bot"
              onChange={handlerChange}
              value={form.username}
              name="username"
              error={error.username}
            />
            <TextInput
              label="ID user"
              onChange={handlerChange}
              value={form.id_user}
              name="id_user"
              error={error.id_user}
            />
          </div>
          <div className="flex justify-end gap-[10px]">
            <Button size="medium" onClick={handlerDelete}>
              Удалить
            </Button>
            <Button
              size="medium"
              onClick={handlerSubmit}
              className="bg-blue-#1 text-white border-none"
              disabled={isLoading || !isValid}
            >
              Сохранить
            </Button>
          </div>
        </ModalWrapper>
      </ModalWindow>
    </>
  );
};

export default UpdateUserModal;
