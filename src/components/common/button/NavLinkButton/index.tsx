import Link from "next/link";
import Icon from "../../Icon";
import { usePathname } from "next/navigation";

interface INavLinkButtonProps {
  to?: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

const NavLinkButton = (props: INavLinkButtonProps) => {
  const { to, icon, label, onClick } = props;
  const pathname = usePathname();
  const isActive = pathname === to;

  const display = (children: React.ReactNode) => {
    const className = "relative p-[12px] flex gap-[16px] font-medium duration-150 group";
    if (to) {
      return (
        <Link href={to} className={className}>
          {children}
        </Link>
      );
    } else if (onClick) {
      return (
        <button onClick={onClick} className={className}>
          {children}
        </button>
      );
    }
    return <div>{children}</div>;
  };

  return display(
    <div className={"flex items-center justify-center gap-2.5"}>
      <Icon name={icon} className="!w-[30px] h-[30px] !text-[#3c59ff]" />
      <span
        className={
          "text-[#667085] group-hover:!text-blue-#3 group-hover:font-bold duration-150" +
          (isActive ? " !text-[#667085] font-bold" : "")
        }
      >
        {label}
      </span>
    </div>
  );
};

export default NavLinkButton;
