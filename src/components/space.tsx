import { SPACE_RADIUS, SPACE_Y } from "@/constants";
import { spaceParams } from "@/types/spaceParams";

export default function Space(params: spaceParams) {
  function decodeColor(value: number) {
    if (value === 0) {
      return "black";
    }
    else if (value === 1) {
      return "white";
    }
    return "lightgray";
  }

  return (
    <circle cx={params.x} cy={SPACE_Y} r={SPACE_RADIUS}
      stroke={decodeColor(params.value)} fill={decodeColor(params.value)}
      onClick={() => params.onClick(params.column)} />
  )
}
