import { PuffLoader } from "react-spinners";

interface ILoaderProps {
  isScreen?: boolean;
}

const Loader = (props: ILoaderProps) => {
  const { isScreen } = props;
  // return <PuffLoader color={darkTheme ? "#FFFFFF" : "#1F1F21"} />;

  if (isScreen) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <PuffLoader color={"#1F1F21"} />
      </div>
    );
  }
  return <PuffLoader color={"#1F1F21"} />;
};

export default Loader;
