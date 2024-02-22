"use client";
import { useCallback, useEffect, useState } from "react";

interface IUseFormProps {
  data: IData;
  validConfig?: IData;
  onSubmit?: (object: IData) => void;
  isAutoClear?: boolean;
}
interface IData {
  [key: string]: any;
}

export interface IHandlerChange {
  name: string;
  value: any;
  id?: string;
}

const initialControl = {
  start: false,
  isValid: true
};

const useForm = (props: IUseFormProps) => {
  const { data = {}, validConfig = {}, onSubmit, isAutoClear = true } = props;
  const [form, setForm] = useState(data);
  const [error, setError] = useState<IData>({});
  const [control, setControl] = useState(initialControl);

  const handlerChange = useCallback(
    ({ name, value }: IHandlerChange) => {
      setForm((state) => ({ ...state, [name]: value }));
    },
    [form]
  );

  const handlerSubmit = (event: any) => {
    // event.preventDefault();

    const result = validator();
    if (!result.isValid) {
      setError(result.errors);
      setControl((state) => ({ ...state, isValid: result.isValid, start: true }));
      return;
    }
    onSubmit?.(form);
    if (isAutoClear) {
      setForm(data);
      setControl(initialControl);
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) setForm(data);
  }, [data]);

  useEffect(() => {
    if (!control.start) {
      // const isEqual = _.isEqual(form, data);
      // if (!isEqual) {
      //   const result = validator();
      //   setError(result.errors);
      //   setControl((state) => ({ ...state, isValid: false, start: true }));
      // }
    } else {
      const result = validator();
      setError(result.errors);
      setControl((state) => ({ ...state, isValid: result.isValid }));
    }
  }, [form]);

  function validator() {
    // let isOne = true;
    let errors = {};
    for (const keyValid in validConfig) {
      const valueValid = validConfig[keyValid];
      // console.log("valid", [keyValid, valueValid]);
      for (const keyForm in form) {
        const valueForm = form[keyForm];
        // console.log("data", [keyForm, valueForm]);
        if (keyValid === keyForm) {
          const result = validation({ valueValid, valueForm });
          // console.log("result", keyValid, result);
          if (result && !result.isValid) {
            errors = { ...errors, [keyForm]: result.message };
            // isOne = true;
            break;
          }
        }
      }
      // if (isOne) break;
    }
    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid };
  }

  function validation({ valueValid, valueForm }: IData) {
    let errorObject = { isValid: true, message: "" };
    for (const key in valueValid) {
      if (!errorObject.isValid) continue;
      switch (key) {
        case "isRequired": {
          const isValid = valueForm?.toString()?.trim().length > 0;
          const message = !isValid ? `Обязательное поле для заполнения` : "";
          errorObject = { isValid, message };
          break;
        }
        case "isNumber": {
          const value = +valueForm;
          const isValid = Number.isFinite(value);
          const message = !isValid ? `Необходимо поле заполнять числом` : "";
          if (isValid) {
            for (const extraKey in valueValid[key]) {
              if (!errorObject.isValid) continue;
              switch (extraKey) {
                case "min": {
                  const isValid = value >= valueValid[key][extraKey];
                  const message = !isValid ? `Чсило должно быть больше ${valueValid[key][extraKey]}` : "";
                  errorObject = { isValid, message };
                  break;
                }
                case "max": {
                  const isValid = value <= valueValid[key][extraKey];
                  const message = !isValid ? `Чсило должно быть меньше ${valueValid[key][extraKey]}` : "";
                  errorObject = { isValid, message };
                  break;
                }
              }
            }
            break;
          } else {
            errorObject = { isValid, message };
            break;
          }
        }
        case "pattern": {
          const regex = new RegExp(valueValid[key]);
          const isValid = regex.test(valueForm);
          const message = !isValid ? `Не соответствует` : "";
          errorObject = { isValid, message };
          break;
        }
        case "isYear": {
          // const number = Number(valueForm.value);
          // const currentYear = new Date().getFullYear();
          // const isValid = number >= 1900 && number <= currentYear;
          // value = !isValid ? `Дата введено не корректно` : "";
          break;
        }
        case "isHttp": {
          // const regex = /^https?:\/\/\S+\.\S+$/;
          // const isValid = !regex.test(valueForm.value);
          // value = !isValid ? `Неверные данные` : "";
          break;
        }
        default:
          break;
      }
    }
    return errorObject;
  }

  return { form, setForm, error, setError, isValid: control.isValid, setControl, handlerChange, handlerSubmit };
};

export default useForm;
