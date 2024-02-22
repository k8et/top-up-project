import Icon from "../../Icon";

interface ILinkTagProps {
  onDelete: (id: string) => void;
  data: IData;
}
interface IData {
  name: string;
  id: string;
}

const LinkTag = (props: ILinkTagProps) => {
  const { onDelete, data } = props;
  return (
    <div className="flex justify-between px-[14px] py-[10px] rounded-[8px] border border-[#D0D5DD]">
      <p>{data.name}</p>
      <button type="button" onClick={() => onDelete(data.id)}>
        <Icon name="close-light" />
      </button>
    </div>
  );
};

export default LinkTag;
