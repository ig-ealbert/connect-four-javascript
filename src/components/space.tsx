import { SPACE_RADIUS, SPACE_Y } from "@/constants";
import { spaceParams } from "@/types/spaceParams";
import { decodeColor } from "@/lib/color";

export default function Space(params: spaceParams) {
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
    <circle cx={params.x} cy={SPACE_Y} r={SPACE_RADIUS}
      stroke={decodeColor(params.value)} fill={decodeColor(params.value)}
      onClick={() => params.onClick(params.column)}
      onMouseEnter={activateHover} onMouseLeave={deactivateHover} />
  )
}
