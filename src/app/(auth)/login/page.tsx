"use client";
import Icon from "@/components/common/Icon";
import Loader from "@/components/common/Loader";
import Button from "@/components/common/button/Button";
import EyePasswordButton from "@/components/common/button/EyePasswordButton";
import TextInput from "@/components/common/input/TextInput";
import ErrorText from "@/components/common/text/ErrorText";
import useForm from "@/hooks/useForm";
import { getAuthLoading, logIn, requestAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const initialData = {
  login: "",
  password: ""
};

const validConfig = {
  login: { isRequired: "" },
  password: { isRequired: "" }
};

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoadingUser = useSelector(getAuthLoading());
  const [isLoading, setLoading] = useState(true);
  const { form, error, isValid, handlerChange, handlerSubmit } = useForm({ data: initialData, onSubmit, validConfig });
  const [passwordType, setPasswordType] = useState("password");
  const [isAuthError, setAuthError] = useState(false);

  function onSubmit(data: any) {
    dispatch(logIn(data))
      .unwrap()
      .then((res) => {
        if (res.auth === true) return router.push("/");
        else setLoading(false);
      })
      .catch((error: any) => {
        if (error?.response?.data?.message === "Wrong auth data") setAuthError(true);
      });
  }

  const handlerChangeForm = (params: any) => {
    if (isAuthError) setAuthError(false);
    handlerChange(params);
  };

  useEffect(() => {
    dispatch(requestAuth())
      .unwrap()
      .then((res) => {
        if (res.auth === true) return router.push("/");
        else setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {isLoading && <Loader isScreen />}
      <div className={"flex flex-col gap-[30px] w-[350px]" + (isLoading ? " opacity-0" : " animate-appearance")}>
        <h1 className="font-semibold text-[36px] text-[#344054] font-manrope flex justify-center">Login to account</h1>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[15px] h-[20px]">
            <div className="bg-gray-200 h-[1px] w-full"></div>
            <div className="bg-gray-200 h-[1px] w-full"></div>
          </div>
          <TextInput
            onChange={handlerChangeForm}
            name="login"
            autoComplete="login"
            value={form.login}
            placeholder="Login"
            error={error.login}
            isError={isAuthError}
          />
          <TextInput
            onChange={handlerChangeForm}
            name="password"
            autoComplete="password"
            value={form.password}
            placeholder="Password"
            type={passwordType}
            error={error.password}
            isError={isAuthError}
            after={<EyePasswordButton type={passwordType} setType={setPasswordType} />}
          />
          {isAuthError && <ErrorText value="Неверный логин или пароль" />}

          <Button
            onClick={handlerSubmit}
            color="primary"
            size="medium"
            className="bg-[#3C59FF] py-[15px] rounded-[10px] font-manrope font-medium text-white mt-[10px]"
            disabled={isLoadingUser || !isValid}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
