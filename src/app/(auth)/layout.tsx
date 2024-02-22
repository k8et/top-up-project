import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Talk | Войти",
  description: "media talk"
};

interface AuthProps {
  children: React.ReactNode;
}

function Auth(props: AuthProps) {
  const { children } = props;

  return <main className="min-h-max flex justify-center items-center grow">{children}</main>;
}
export default Auth;
