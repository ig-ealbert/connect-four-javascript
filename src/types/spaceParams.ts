export type spaceParams = {
  column: number;
  hoverOn: (event: React.MouseEvent) => void;
  hoverOff: (event: React.MouseEvent) => void;
  onClick: (column: number) => void;
  turn?: number;
  value: number;
  x: number;
};
