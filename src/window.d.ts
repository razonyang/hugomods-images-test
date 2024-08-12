
interface ProductOption {
  code: string;
  name: string;
  values: string[];
  valueCodes: string[];
}
interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: string;
  discountPrice: string;
  shippingWeight: string;
  length: string;
  width: string;
  height: string;
  /** If stock < 0, "backordered". If stock > 5, 10. else stock number */
  stockLevel?: `${1 | 2 | 3 | 4 | 5}` | 'Backordered';
  imageLinks: string[];
}
interface VariantOption {
  code: string;
  name: string;
}
interface AntennaProductVariant extends ProductVariant {
  color: VariantOption;
  band: VariantOption;
}

interface Window {
  backend_url: string;
  aNetHost: string;
  current_user?: string;
  _userMessage: {element: HTMLElement, html: string} | null;
  productSlug?: string;
  productOptions?: ProductOption[];
  productVariants?: Record<string, AntennaProductVariant>;

  Snipcart: any;
}
