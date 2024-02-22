import { useState } from "react";

const useTable = ({ data, configFilter }) => {
  const [filter, setFilter] = useState(handlerClearFilter(data?.[0]));
  const [selectedData, setSelectedData] = useState([]);

  function handlerResetFilter() {
    const newFilter = handlerClearFilter(data?.[0]);
    setFilter(newFilter);
    setSelectedData([]);
  }

  function handlerClearFilter(data) {
    let newData = {};
    for (const dataKey in data) {
      newData = { ...newData, [dataKey]: "" };
      for (const configKey in configFilter) {
        if (dataKey === configKey) {
          newData = { ...newData, [dataKey]: configFilter[configKey] };
        }
      }
    }
    return newData;
  }

  const handlerChange = ({ name, value }) => {
    console.log({ name, value });
    setFilter(state => ({ ...state, [name]: value }));
  };

  const handlerChecked = id => {
    if (id) return selectedData.includes(id);
    else return selectedData.length > 0 ? arrayEqual(selectedData, getIdList(data)) : false;
  };

  const handlerSelect = id => {
    const isString = typeof id?.toString() === "string" && !id?.name;
    if (isString) {
      if (selectedData.includes(id)) {
        setSelectedData(prevState => removeFromArrayByValue([...prevState], id));
      } else {
        setSelectedData(prevState => {
          const newState = [...prevState];
          newState.push(id);
          return newState;
        });
      }
    } else {
      if (arrayEqual(selectedData, getIdList(data))) setSelectedData([]);
      else setSelectedData(getIdList(data));
    }
  };

  const getIdList = data => {
    return data.map(m => m.id);
  };

  const arrayEqual = (arrayFirst, arraySecond) => {
    arrayFirst.sort((a, b) => a - b);
    arraySecond.sort((a, b) => a - b);
    return JSON.stringify(arrayFirst) === JSON.stringify(arraySecond);
  };

  const removeFromArrayByValue = (mass, value) => {
    const index = mass.indexOf(value); // Находим индекс элемента, который нужно удалить
    if (index !== -1) {
      mass.splice(index, 1); // Удаляем элемент с найденным индексом из массива
    }
    return mass;
  };

  return {
    filter,
    setFilter,
    selectedData,
    setSelectedData,
    handlerSelect,
    handlerChecked,
    handlerResetFilter,
    handlerChange
  };
};

export default useTable;
