"use client";
import StatusTag from "../../tag/StatusTag";

interface IDisplayLinkStatusProps {
  value: boolean;
}

const DisplayLinkStatus = (props: IDisplayLinkStatusProps) => {
  const { value } = props;
  const displayStatus = (value: boolean) => {
    if (value === true)
      return (
        <StatusTag
          className="bg-green-#3"
          label="Завершено"
          labelClassName="text-green-#2"
          icon="check"
          iconClassName="text-green-#1"
        />
      );
    if (value === false)
      return (
        <StatusTag
          className="bg-orange-#3 "
          label="Активно"
          labelClassName="text-orange-#2"
          icon={
            <div className="animate-spin-slow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6050_633)">
                  <path
                    d="M6 1V3M6 9V11M2.465 2.465L3.88 3.88M8.12 8.12L9.535 9.535M1 6H3M9 6H11M2.465 9.535L3.88 8.12M8.12 3.88L9.535 2.465"
                    stroke="#E8872E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6050_633">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          }
        />
      );
    return value;
  };
  return displayStatus(value);
};

export default DisplayLinkStatus;
