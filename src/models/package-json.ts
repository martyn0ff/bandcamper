export default interface PackageJson {
  url: string;
  type_name: string;
  type_title: string;
  description: string;
  price: number;
  currency: string;
  download_release_date: string;
  quantity_available: number | null;
}
