import { useState, useEffect } from "react";
import { header } from "./header.json";
import { TableProps } from "@/models/schedule-table";

function sort(arr: TableProps[]) {
  for(var i = 0; i < arr.length; i++) {
    for(var j = 0; j < (arr.length - i - 1); j++) {
      if(Number(arr[j].id) > Number(arr[j + 1].id)) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

export default function Table(props: {apiEndPoint: string}) {
  
  const [columnTable, setColumnTable] = useState([]);
  
  useEffect(() => {
    fetch(`/api/v1/schedule${props.apiEndPoint}`, {
      cache: "no-store",
      method: "GET"
    }).then((response) => response.json())
      .then((data) => setColumnTable(sort(data.content)));
  }, [props.apiEndPoint]);
  
  return (
    <div className="flex flex-col">
      <div className="align-middle inline-block min-w-full">
        <div className="overflow-scroll">
          {(columnTable.length > 0) ? (
            <table className="table-auto overflow-scroll w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="border-neutral-900">
                <tr className="divide-x divide-gray-200">
                  {header.map((row, index) => (
                    <th key={index} className="p-4">{row.title}</th>
                  ))}
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {columnTable.map((row, index) => (
                  <tr key={row.id} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap p-3 md:py-4 text-center text-sm">{index+1}</td>
                    <td className="whitespace-nowrap p-3 md:py-4 text-center text-sm">{`${row.day}, ${row.date}`}</td>
                    <td className="whitespace-nowrap p-3 md:py-4 text-center text-sm text-wrap">{row.time.replaceAll("_", ",\n")}</td>
                    <td className="whitespace-nowrap p-3 md:py-4 text-center text-sm text-wrap">{row.event.replaceAll("_", ",\n")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="p-5 text-center text-sm">Tidak ada jadwal di bulan ini.</h3>
          )}
        </div>
      </div>
    </div>
  );
}