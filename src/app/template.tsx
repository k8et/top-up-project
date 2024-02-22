"use client";
import { getAuth } from "@/store/slices/authSlice";
import { requestUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface TemplateProps {
  children: React.ReactNode;
}

function Template(props: TemplateProps) {
  const { children } = props;
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuth());

  useEffect(() => {
    if (auth?.auth) {
      dispatch(requestUser());
    }
  }, [auth.auth]);

  return children;
}
export default Template;
