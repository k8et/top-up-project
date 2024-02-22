import { ColorComponent, SizeComponent } from "@/types";

interface IButtonProps {
  onClick?: (event: any) => void;
  children: React.ReactNode;
  size?: SizeComponent;
  color?: ColorComponent;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = (props: IButtonProps) => {
  const { onClick, children, className, color, disabled, type = "button", size = "medium" } = props;

  const sizeClass = (s: SizeComponent | undefined) => {
    // if (s === "big") return " py-[12px] px-[20px] font-semibold";
    if (s === "medium") return " py-[12px] px-[20px] font-semibold";
    if (s === "mini") return " py-[10px] px-[20px] font-medium text-[14px]";
    // return " py-[8px] px-[14px]";
  };
  const colorClass = (c: ColorComponent | undefined) => {
    if (c === "primary") return " bg-blue-#1 text-white disabled:bg-grey-#4";
    return " text-blue-#4 disabled:bg-grey-#4";
  };

  return (
    <button
      onClick={onClick}
      className={
        "flex justify-center gap-[8px] rounded-[8px] border border-grey-#4 transition duration-200 focus:shadow-[0px_0px_0px_4px_rgba(242,244,247,1)] hover:shadow-[0px_0px_0px_4px_rgba(242,244,247,1)]" +
        sizeClass(size) +
        colorClass(color) +
        (className ? " " + className : "")
      }
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
