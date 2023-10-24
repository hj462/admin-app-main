import Image from "next/image";
import React from "react";
import Pagination from "./Pagination";
import editIcon from "../../assets/edit.png";
import { useRouter } from "next/router";
import deleteIcon from "../../assets/delete-icon.svg";
import Loader from "./Loader";
import { GetFromStorage } from "../utils/Common";

type Col = {
  title: string;
  key: string;
  id: number | string;
  cell?: (data: any) => void;
};

type data = {
  cols: Array<Col>;
  data: Array<any>;
  id?: number;
  getUpdateId?: any;
  rowsPerPage?: any;
  totalRows?: any;
  setRowsPerPage?: any;
  currentPage?: any;
  setCurrentPage?: any;
  getDeleteId?: any;
  pagination?: boolean;
  loading?: boolean;
  showDeleteButton?: boolean;
};

const Table = ({
  cols,
  data,
  getUpdateId,
  rowsPerPage,
  totalRows,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  getDeleteId,
  pagination = true,
  loading,
  showDeleteButton = true,
}: data) => {
  const router = useRouter();
  const geoId = GetFromStorage("geographyId");
  return (
    <section className="text-gray-600 body-font font-inter">
      {loading ? (
        <Loader />
      ) : (
        <>
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                {cols.map((item) => (
                  <th
                    key={item.key}
                    className="px-4 h-12 pt-3 tracking-wider font-semibold text-[#645C41] text-sm bg-[#e7edf43e]"
                  >
                    {item.title}
                  </th>
                ))}
                <th className="px-4 h-12 pt-3 tracking-wider font-semibold text-[#645C41] text-sm bg-[#e7edf43e]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => {
                return (
                  <tr key={item.id} className="border-b">
                    {cols.map((col) => (
                      <td
                        className={
                          col.id == 0
                            ? geoId?.includes("All") &&
                              router.pathname === "/regulatory"
                              ? "h-12 px-4 pt-2 text-sm text-[#393232] pointer-events-none"
                              : "inline-block relative transition-all duration-500 before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-gradient-to-r before:from-[#C8B568] before:via-[#C8B568] before:to-[#C8B568] hover:before:w-full hover:before:opacity-100 cursor-pointer h-8 px-4 pt-4 text-sm text-[#393232]"
                            : "h-12 px-4 pt-2 text-sm text-[#393232]"
                        }
                        onClick={() => {
                          col.id == 0
                            ? router.pathname === "/c-thru-ai"
                              ? getUpdateId(item.key)
                              : getUpdateId(item.id)
                            : null;
                        }}
                        key={`${col.key} + ${item.id}`}
                      >
                        {col.cell
                          ? col.cell(item[col.key])
                          : item[col.key]?.toString()}
                      </td>
                    ))}

                    <td className="h-12 px-4 text-sm">
                      <div className="flex">
                        <div
                          className={
                            geoId?.includes("All") &&
                            router.pathname === "/regulatory"
                              ? "flex cursor-not-allowed"
                              : "flex"
                          }
                        >
                          <Image
                            src={editIcon}
                            alt="edit"
                            width="18"
                            className={
                              geoId?.includes("All") &&
                              router.pathname === "/regulatory"
                                ? "pointer-events-none mr-3"
                                : "cursor-pointer mr-3"
                            }
                            onClick={() => {
                              router.pathname === "/c-thru-ai"
                                ? getUpdateId(item.key)
                                : getUpdateId(item.id);
                            }}
                          />
                          {showDeleteButton && (
                            <Image
                              src={deleteIcon}
                              alt="delete"
                              width="18"
                              className={
                                geoId?.includes("All") &&
                                router.pathname === "/regulatory"
                                  ? "pointer-events-none"
                                  : "cursor-pointer"
                              }
                              onClick={() => getDeleteId(item.id)}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {pagination && (
        <Pagination
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          setRowsPerPage={setRowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default Table;
