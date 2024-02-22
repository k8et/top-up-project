import Icon from "../../Icon";

interface IStatusTagProps {
  className: string;
  label: string;
  labelClassName: string;
  icon: string | React.ReactNode;
  iconClassName?: string;
}

const StatusTag = (props: IStatusTagProps) => {
  const { className, label, labelClassName, icon, iconClassName } = props;
  return (
    <div
      className={
        "inline-flex items-center gap-[4px] rounded-[16px] py-[2px] pl-[6px] pr-[8px]" +
        (className ? " " + className : "")
      }
    >
      {typeof icon === "string" ? (
        <Icon name={icon} className={"!w-[12px] !h-[12px]" + (iconClassName ? " " + iconClassName : "")} />
      ) : (
        icon
      )}
      <span className={"font-medium text-[12px] text-nowrap" + (labelClassName ? " " + labelClassName : "")}>
        {label}
      </span>
    </div>
  );
};

export default StatusTag;
