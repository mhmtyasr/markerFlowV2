export interface IElementData {
  coords: {
    height: number;
    width: number;
    x: number;
    y: number;
    xRate: number;
    yRate: number;
  };
  selector: string;
  id: string | null;
  outerHTML: string | null;
  tagName: string | null;
  textContent: string | null;
  imgBase64: string | null | undefined;
}
