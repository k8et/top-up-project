"use client";
import Loader from "@/components/common/Loader";
import { requestAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { redirect, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setLoading] = useState(true);

    useLayoutEffect(() => {
      dispatch(requestAuth())
        .unwrap()
        .then((res) => {
          if (res.auth === false) {
            setLoading(false);
            return redirect("/login");
          } else setLoading(false);
        })
        .catch(() => {
          return router.push("/login");
        });
    }, []);

    return isLoading ? (
      <div>
        <Loader isScreen />
        <div style={{ opacity: "0" }}>
          <Component {...props} />
        </div>
      </div>
    ) : (
      <Component {...props} />
    );
  };
}
export default isAuth;
