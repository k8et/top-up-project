import React, { Key, useState } from "react";
import Icon from "../Icon";
import Button from "../button/Button";

interface ITableProps {
  data: IData;
  columns: IColumns[];
  className?: string;
  onClick?: (obj: IData) => void;
}

interface IData {
  [key: string]: any;
}

interface IColumns {
  label?: string;
  head?: string;
  body?: ((value: any) => React.ReactNode) | string;
  className?: string;
  classNameBody?: string;
}

const Table = (props: ITableProps) => {
  const { data = {}, columns = [], className, onClick } = props;
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const countPages = Math.ceil(data.length / pageSize);
  const currentItems = paginate(data, currentPage, pageSize);
  const sortedData = currentItems;

  function paginate(items: any, pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  }

  const classButtonPage = "flex justify-center py-[10px] px-[11px] text-[14px] font-medium min-w-[40px]";

  return (
    <div
      className={
        "border border-grey-#5 border-b-grey-#5 rounded-[8px] overflow-x-auto bg-white" +
        (className ? " " + className : "")
      }
    >
      <div className="min-w-[1024px] xl:min-w-0">
        <div className="flex bg-grey-#6 border-b border-grey-#5">
          {columns?.map((column) => (
            <div
              key={column.label}
              className={
                "flex w-full px-[24px] py-[13px] font-medium text-[12px] text-grey-#3 items-end" +
                (column.className ? " " + column.className : "")
              }
            >
              {column.label}
            </div>
          ))}
        </div>
        <div className="flex flex-col divide-y divide-grey-#5">
          {sortedData?.length === 0 && <div className="flex justify-center w-full p-[24px]">Ничего не найдено</div>}
          {sortedData?.map((item: any, index: Key | null | undefined) => (
            <div key={index} onClick={() => onClick?.(item || {})} className="flex">
              {Object.values(columns).map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={
                    "w-full p-[24px] flex items-center" +
                    (column.className ? " " + column.className : "") +
                    (column.classNameBody ? " " + column.classNameBody : "")
                  }
                >
                  {typeof column?.body === "function" ? column.body?.(item) : column.body}
                </div>
              ))}
            </div>
          ))}
        </div>

        {true && (
          <div className="flex justify-between py-[14px] px-[24px] border-t border-grey-#5">
            <div className="w-full flex justify-start">
              {currentPage !== 1 && (
                <Button onClick={() => setCurrentPage((state) => state - 1)}>
                  <Icon name="arrow" className="!w-[20px] !h-[20px] rotate-180" />
                  <span className="font-medium text-[14px]">Back</span>
                </Button>
              )}
            </div>
            <div className="w-full flex justify-center">
              {currentPage !== 1 && (
                <button onClick={() => setCurrentPage(1)} className={classButtonPage + " text-blue-#5"}>
                  1
                </button>
              )}
              {currentPage >= 5 && <p className={classButtonPage + " text-blue-#5"}>...</p>}
              {currentPage >= 4 && (
                <button
                  onClick={() => setCurrentPage((state) => state - 2)}
                  className={classButtonPage + " text-blue-#5"}
                >
                  {currentPage - 2}
                </button>
              )}
              {currentPage >= 3 && (
                <button
                  onClick={() => setCurrentPage((state) => state - 1)}
                  className={classButtonPage + " text-blue-#5"}
                >
                  {currentPage - 1}
                </button>
              )}
              <p className={classButtonPage + " bg-purple-#2 text-purple-#1 rounded-[8px]"}>{currentPage}</p>
              {currentPage <= countPages - 2 && (
                <button
                  onClick={() => setCurrentPage((state) => state + 1)}
                  className={classButtonPage + " text-blue-#5"}
                >
                  {currentPage + 1}
                </button>
              )}
              {currentPage <= countPages - 3 && (
                <button
                  onClick={() => setCurrentPage((state) => state + 2)}
                  className={classButtonPage + " text-blue-#5"}
                >
                  {currentPage + 2}
                </button>
              )}
              {currentPage <= countPages - 4 && <p className={classButtonPage}>...</p>}
              {countPages > 1 && currentPage !== countPages && (
                <button onClick={() => setCurrentPage(countPages)} className={classButtonPage + " text-blue-#5"}>
                  {countPages}
                </button>
              )}
            </div>
            <div className="w-full flex justify-end">
              {countPages > 1 && currentPage !== countPages && (
                <Button onClick={() => setCurrentPage((state) => state + 1)}>
                  <span className="font-medium text-[14px]">Forward</span>
                  <Icon name="arrow" className="!w-[20px] !h-[20px]" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
