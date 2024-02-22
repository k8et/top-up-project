import Icon from "@/components/common/Icon";
import Button from "@/components/common/button/Button";
import TextInput from "@/components/common/input/TextInput";
import ModalWindow from "@/components/common/modal/ModalWindow";
import ModalWrapper from "@/components/common/wrapper/ModalWrapper";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import { createUser, getUserLoading } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";

const data = {
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

const CreateUserModal = () => {
  const { isOpen, handlerToggle } = useModal();
  const isLoading = useSelector(getUserLoading());
  const { form, error, setError, isValid, handlerChange, handlerSubmit } = useForm({
    data,
    onSubmit,
    validConfig,
    isAutoClear: false
  });
  const dispatch = useAppDispatch();

  function onSubmit(data: any) {
    dispatch(createUser(data))
      .unwrap()
      .then(() => handlerToggle())
      .catch((error) => {
        if (error?.error === "Login occupied") {
          setError({ login: "Данный логин уже занят." });
        }
      });
    // ;
  }

  return (
    <>
      <div>
        <Button size="medium" color="primary" onClick={handlerToggle}>
          Add user
        </Button>
      </div>
      <ModalWindow isOpen={isOpen} onClickOut={handlerToggle} width={480}>
        <ModalWrapper>
          <div className="flex justify-between items-center">
            <div>Add user</div>
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
            <Button size="medium" onClick={handlerToggle}>
              Отмена
            </Button>
            <Button
              size="medium"
              onClick={handlerSubmit}
              className="bg-blue-#1 text-white border-none"
              disabled={isLoading || !isValid}
            >
              Добавить
            </Button>
          </div>
        </ModalWrapper>
      </ModalWindow>
    </>
  );
};

export default CreateUserModal;
