import { IHandlerChange } from "@/hooks/useForm";

interface IRadioButtonProps {
  onChange: ({ name, value }: IHandlerChange) => void;
  name: string;
  value: string;
  data: IData[];
  className: string;
}
interface IData {
  label: string;
  value: string;
}

const RadioButton = (props: IRadioButtonProps) => {
  const { onChange, data, name, value, className } = props;

  const handlerChange = (value: string) => {
    onChange?.({ name, value });
  };

  return (
    <div
      className={
        "w-full flex overflow-hidden rounded-[8px] border border-grey-#4 divide-x divide-grey-#4" +
        (className ? " " + className : "")
      }
    >
      {data?.map(item => (
        <div key={item.value}>
          <input
            className="hidden"
            type="radio"
            id={"radio-" + item.value}
            name={name}
            onChange={() => handlerChange(item.value)}
          />

          <label
            className={
              "flex px-[16px] py-[10px] text-blue-#2  font-medium text-[14px]" +
              (item.value === value ? " bg-blue-#7" : " bg-white")
            }
            htmlFor={"radio-" + item.value}
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
