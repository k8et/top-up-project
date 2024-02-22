import Icon from "@/components/common/Icon";
import TextInput from "@/components/common/input/TextInput";
import Label from "@/components/common/text/Label";
import { IHandlerChange } from "@/hooks/useForm";
import { ObjectData } from "@/types";

interface ILinkListFormProps {
  name: string;
  itemName: string;
  label?: string;
  data: ObjectData[];
  onDelete: (id: string) => void;
  onChange: (form: IHandlerChange) => void;
}

const LinkListForm = (props: ILinkListFormProps) => {
  const { label, name, data, onDelete, onChange, itemName } = props;

  const handlerChange = (item: any) => {
    const newData = [...data];
    const index = newData.findIndex((f: any) => f.id === item.id);
    newData[index] = { ...newData[index], [itemName]: item.value };
    onChange({ name, value: newData });
  };
  return (
    <div className="flex flex-col gap-[6px]">
      {label && <Label>{label}</Label>}
      {data.map((item: any) => (
        <TextInput
          key={item.id}
          onChange={(input) => handlerChange({ ...input, id: item.id })}
          value={item[itemName]}
          name={itemName}
          after={
            <button type="button" onClick={() => onDelete(item.id)}>
              <Icon name="close-light" />
            </button>
          }
        />
      ))}
    </div>
  );
};

export default LinkListForm;
