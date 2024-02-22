import TextInput from "@/components/common/input/TextInput";
import { IHandlerChange } from "@/hooks/useForm";

interface ITimesSmartModeFormProps {
  data: IDataTimes[];
  onChange: ({ name, value }: IHandlerChange) => void;
  name: string;
}

interface IDataTimes {
  id: string;
  time: string;
  percent: string;
}

interface INameValueId {
  id?: string;
  name: string;
  value: string;
}

const TimesSmartModeForm = (props: ITimesSmartModeFormProps) => {
  const { data, onChange, name } = props;

  const handlerChange = (item: INameValueId) => {
    const index = data.findIndex((f) => f.id === item.id);
    if (!(index >= 0)) return;
    let newData = [...data];
    newData[index] = { ...newData[index], [item.name]: item.value };
    onChange?.({ name, value: newData });
  };

  return (
    <>
      {data &&
        data?.map((item: IDataTimes) => (
          <div key={item.id} className="grid grid-cols-2 gap-[9px]">
            <TextInput
              onChange={({ name, value }) => handlerChange({ name, value, id: item.id })}
              value={item.time}
              name="time"
            />
            <TextInput
              onChange={({ name, value }) => handlerChange({ name, value, id: item.id })}
              value={item.percent}
              name="percent"
            />
          </div>
        ))}
    </>
  );
};

export default TimesSmartModeForm;
