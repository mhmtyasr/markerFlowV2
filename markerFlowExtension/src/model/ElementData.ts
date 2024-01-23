export interface ElementData {
  coords: {
    height: number;
    width: number;
    x: number;
    y: number;
    xRate: number;
    yRate: number;
  };
  selector: string | null;
  id: string | null;
  outerHTML: string ;
  tagName: string;
  textContent: string | null;
}
