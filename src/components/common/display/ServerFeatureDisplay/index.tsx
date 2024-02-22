interface IServerFeatureDisplay {
  data: IData;
}
interface IData {
  [key: string]: string;
}

const ServerFeatureDisplay = (props: IServerFeatureDisplay) => {
  const { data } = props;

  return (
    (data.ram || data.cpu || data.storage) && (
      <span
        className="text-[#667085] text-[14px] block
      "
      >
        {data.ram && data.ram + " ГБ память"}
        {data.ram && data.cpu && " / "}
        {data.cpu && data.cpu + " соrе Процессор"}
        {data.cpu && data.storage && " / "}
        {data.storage && data.storage + " ГБ Хранилище"}
      </span>
    )
  );
};

export default ServerFeatureDisplay;
