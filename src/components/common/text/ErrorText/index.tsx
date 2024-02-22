import Icon from "../../Icon";

interface ErrorTextProps {
  value: string;
}

const ErrorText = (props: ErrorTextProps) => {
  const { value } = props;
  return (
    <p className="flex gap-[10px] text-error">
      <Icon name="error" /> <span>{value}</span>
    </p>
  );
};

export default ErrorText;
