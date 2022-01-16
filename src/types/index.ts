export interface INotes {
  id: string;
  key: string;
  text: string;
  position: IPosition;
  styles: React.CSSProperties;
}

export interface IPosition {
  x: number;
  y: number;
}
