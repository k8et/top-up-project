import { useState } from "react";

function useModal() {
  const [isOpen, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null || {} || []);

  const handlerToggle = (data?: any) => {
    if (data) setCurrentData(data);
    setOpen(state => !state);
  };

  return { isOpen, setOpen, handlerToggle, currentData, setCurrentData };
}
export default useModal;
