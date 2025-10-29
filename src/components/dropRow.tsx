"use client";

import { dropRowParams } from "@/types/dropRowParams";
import { cols } from "@/constants";
import Space from "./space";

export default function DropRow(params: dropRowParams) {
  function handleClick(column: number) {
    if (params.nextFreeRows[column] < 0) {
      return;
    }
    params.clickHandler(column);
  }
  return (
    <tr>
      <td>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="boardRow"
          key="dropRow"
          id="dropRow"
        >
          {cols.map((colNumber) => (
            <Space
              key={`dropSpaceCol${colNumber}`}
              x={55 + 110 * colNumber}
              column={colNumber}
              onClick={handleClick}
              turn={params.turn}
              value={2}
            />
          ))}
        </svg>
      </td>
    </tr>
  );
}
