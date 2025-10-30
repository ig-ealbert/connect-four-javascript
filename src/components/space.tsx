import { SPACE_RADIUS, SPACE_X, SPACE_Y } from "@/constants";
import { spaceParams } from "@/types/spaceParams";
import { decodeColor } from "@/lib/color";

export default function Space(params: spaceParams) {
  return (
    <circle
      cx={SPACE_X}
      cy={SPACE_Y}
      r={SPACE_RADIUS}
      stroke={decodeColor(params.value)}
      fill={decodeColor(params.value)}
      onClick={() => params.onClick(params.column)}
      onMouseEnter={params.hoverOn}
      onMouseLeave={params.hoverOff}
    />
  );
}
