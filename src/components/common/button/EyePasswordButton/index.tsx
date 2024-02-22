type TType = "password" | "text";

interface IEyePasswordButton {
  type: string;
  setType: (t: any) => void;
}

const EyePasswordButton = (props: IEyePasswordButton) => {
  const { type, setType } = props;

  const handlerToggleType = () => {
    setType((state: string) => (state === "password" ? "text" : "password"));
  };

  return (
    <button type="button" onClick={handlerToggleType}>
      {type === "password" ? (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.73271 11.1013C2.74186 11.1237 2.75209 11.1485 2.76343 11.1753C2.82872 11.3298 2.93048 11.5542 3.07342 11.8254C3.35978 12.3688 3.80862 13.095 4.45637 13.8232C5.74636 15.2736 7.82182 16.7323 11.0082 16.7844C14.1839 16.8363 16.2522 15.3837 17.5409 13.9089C18.1882 13.168 18.6372 12.4222 18.9239 11.8617C19.067 11.5819 19.169 11.3498 19.2345 11.1897C19.2472 11.1585 19.2586 11.13 19.2686 11.1045C19.2587 11.0779 19.2475 11.0483 19.2348 11.0156C19.1713 10.8523 19.0721 10.6156 18.932 10.33C18.6514 9.75771 18.2098 8.99515 17.5671 8.23432C16.2878 6.71969 14.218 5.21429 11.0001 5.21429C7.78211 5.21429 5.71233 6.71969 4.43301 8.23432C3.79038 8.99515 3.34873 9.75771 3.06812 10.33C2.92808 10.6156 2.82889 10.8523 2.76537 11.0156C2.75317 11.047 2.7423 11.0756 2.73271 11.1013ZM19.8001 11.1091C20.2772 10.9597 20.2771 10.9594 20.2771 10.9591L20.2763 10.9567L20.2746 10.9514L20.2689 10.9339C20.2641 10.9193 20.2571 10.8988 20.2481 10.8727C20.2299 10.8206 20.203 10.7463 20.1667 10.653C20.0942 10.4666 19.9838 10.2037 19.8299 9.88977C19.5226 9.26305 19.0388 8.42692 18.3311 7.58905C16.9098 5.90629 14.5795 4.21429 11.0001 4.21429C7.4206 4.21429 5.09038 5.90629 3.66906 7.58905C2.96136 8.42692 2.47754 9.26305 2.17025 9.88977C2.01634 10.2037 1.90597 10.4666 1.83343 10.653C1.79714 10.7463 1.77026 10.8206 1.75209 10.8727C1.743 10.8988 1.73608 10.9193 1.73125 10.9339L1.72556 10.9514L1.72386 10.9567L1.7233 10.9585C1.72321 10.9587 1.72292 10.9597 2.20007 11.1091L1.72292 10.9597L1.67383 11.1164L1.72728 11.2718L2.20007 11.1091C1.72728 11.2718 1.72719 11.2715 1.72728 11.2718L1.72769 11.273L1.7283 11.2747L1.7301 11.2798L1.7361 11.2966C1.74117 11.3106 1.74841 11.3303 1.75788 11.3551C1.77683 11.4049 1.80476 11.4757 1.84231 11.5646C1.91738 11.7422 2.03113 11.9925 2.18874 12.2916C2.50351 12.8889 2.99601 13.686 3.70916 14.4878C5.14097 16.0976 7.4655 17.7266 10.9919 17.7842C14.5291 17.8421 16.8607 16.2071 18.2939 14.5668C19.0075 13.7502 19.4998 12.9316 19.8142 12.3171C19.9716 12.0094 20.0852 11.7513 20.1601 11.5682C20.1975 11.4765 20.2254 11.4035 20.2442 11.3523C20.2537 11.3266 20.2609 11.3064 20.2659 11.292L20.2718 11.2748L20.2736 11.2696L20.2742 11.2678C20.2743 11.2676 20.2746 11.2667 19.8001 11.1091ZM19.8001 11.1091L20.2746 11.2667L20.3254 11.1136L20.2771 10.9591L19.8001 11.1091ZM19.3231 11.2592C19.3232 11.2592 19.3231 11.2592 19.3231 11.2592ZM11.0001 9.386C10.0482 9.386 9.30007 10.1334 9.30007 11.0267C9.30007 11.9201 10.0482 12.6675 11.0001 12.6675C11.9519 12.6675 12.7001 11.9201 12.7001 11.0267C12.7001 10.1334 11.9519 9.386 11.0001 9.386ZM8.30007 11.0267C8.30007 9.55552 9.52186 8.386 11.0001 8.386C12.4783 8.386 13.7001 9.55552 13.7001 11.0267C13.7001 12.498 12.4783 13.6675 11.0001 13.6675C9.52186 13.6675 8.30007 12.498 8.30007 11.0267Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.7002 17.875L4.9502 4.125M9.35019 9.57144C9.00789 9.94882 8.80019 10.4445 8.80019 10.9874C8.80019 12.1697 9.78517 13.1282 11.0002 13.1282C11.5604 13.1282 12.0717 12.9244 12.4601 12.5889M18.7358 13.1282C19.4931 11.9944 19.8002 11.0698 19.8002 11.0698C19.8002 11.0698 17.7976 4.675 11.0002 4.675C10.6186 4.675 10.2521 4.69516 9.90019 4.7332M15.9502 15.9037C14.6876 16.7091 13.0621 17.2787 11.0002 17.245C4.28737 17.1352 2.2002 11.0698 2.2002 11.0698C2.2002 11.0698 3.1699 7.97324 6.05019 6.08971"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
};

export default EyePasswordButton;