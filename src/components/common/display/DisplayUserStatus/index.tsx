import Icon from "../../Icon";
import StatusTag from "../../tag/StatusTag";

interface IDisplayUserStatusProps {
  value: boolean;
}

const DisplayUserStatus = (props: IDisplayUserStatusProps) => {
  const { value } = props;
  const displayStatus = (value: boolean) => {
    if (value === true)
      return (
        <StatusTag
          className="bg-green-#3"
          label="Активный"
          labelClassName="text-green-#2"
          icon="check"
          iconClassName="text-green-#1"
        />
      );
    if (value === false)
      return (
        <StatusTag
          className="bg-red-#3"
          label="Удаленный"
          labelClassName="text-red-#2"
          icon="close"
          iconClassName="text-red-#2"
        />
      );
    return value;
  };
  return displayStatus(value);
};

export default DisplayUserStatus;
