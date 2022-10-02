export default interface IPackage {
  url: string;
  typeName: string;
  typeTitle: string;
  description: string;
  price: number;
  currency: string; // maybe create a new subset: "EUR" | "USD" | ...
  downloadReleaseDate: Date;
  quantityAvailable: number | null; // null is used when its a preorder
}
