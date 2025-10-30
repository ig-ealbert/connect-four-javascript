"use client";

import { dropRowParams } from "@/types/dropRowParams";
import { cols } from "@/constants";
import { decodeColor } from "@/lib/color";
import Space from "./space";

export default function DropRow(params: dropRowParams) {
  function handleClick(column: number) {
    if (params.nextFreeRows[column] < 0) {
      return;
    }
    params.clickHandler(column);
  }

  function activateHover(event: React.MouseEvent) {
    const element = event.target as Element;
    if (params.turn !== 0 && params.turn !== 1) {
      return;
    }
    const color = decodeColor(params.turn);
    element.setAttribute("fill", color);
  }

  function deactivateHover(event: React.MouseEvent) {
    const element = event.target as Element;
    element.setAttribute("fill", decodeColor(2));
  }

  return (
    <tr>
      {cols.map((colNumber) => (
        <td key={`dropSpaceCol${colNumber}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="boardSpace"
            key="dropRow"
            id="dropRow"
          >
            <Space
              column={colNumber}
              hoverOn={(event: React.MouseEvent) => activateHover(event)}
              hoverOff={(event: React.MouseEvent) => deactivateHover(event)}
              onClick={handleClick}
              turn={params.turn}
              value={2}
            />
          </svg>
        </td>
      ))}
    </tr>
  );
}
