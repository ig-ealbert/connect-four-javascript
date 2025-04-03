'use client'

import { dropRowParams } from "@/types/dropRowParams"
import Space from "./space"

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
      <svg xmlns="http://www.w3.org/2000/svg" className="boardRow" key="dropRow" id="dropRow">
        <Space x={55} column={0} onClick={handleClick} value={params.turn} />
        <Space x={165} column={1} onClick={handleClick} value={params.turn} />
        <Space x={275} column={2} onClick={handleClick} value={params.turn} />
        <Space x={385} column={3} onClick={handleClick} value={params.turn} />
        <Space x={495} column={4} onClick={handleClick} value={params.turn} />
        <Space x={605} column={5} onClick={handleClick} value={params.turn} />
        <Space x={715} column={6} onClick={handleClick} value={params.turn} />
      </svg>
      </td>
    </tr>
  )
}
