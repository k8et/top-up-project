import Sidebar from "@/components/ui/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payman admin",
  description: "payman admin"
};

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    <div className="flex grow flex-col xl:flex-row bg-blue-#6 p-[16px] xl:p-0 gap-[32px] xl:gap-0">
      <Sidebar />
      <main className="w-full xl:py-[34px] xl:px-[36px]">{children}</main>
    </div>
  );
}
export default MainLayout;
