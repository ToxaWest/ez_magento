declare interface SmallImageInterface {
  label: string,
  url: string
}

declare interface MediaGalleryInterface {
  disabled: boolean,
  label: string,
  url: string
}

declare interface FinalPriceInterface {
  currency: string,
  value: number
}

declare interface ProductPriceRangeInterface {
  maximum_price: {
    discount: {
      percent_off: number
    },
    final_price: FinalPriceInterface
  },
  minimum_price: {
    final_price: FinalPriceInterface
  }
}

declare interface SAttributesInterface {
  attribute_code: string,
  attribute_label: string,
  attribute_options: {
    label: string,
    value: string
  }[],
  attribute_type: string,
  attribute_value: string
}

declare interface ProductInterface {
  __typename: 'SimpleProduct' | 'ConfigurableProduct',
  categories: CategoryInterface[],
  configurable_options?: {
    attribute_code: string
    label: string
    values: {
      store_label: string
      uid: string
    }[]
  }[],
  id: number,
  media_gallery: MediaGalleryInterface[],
  name: string,
  parent_sku?: string,
  price_range: ProductPriceRangeInterface,
  related_products: ProductInterface[],
  s_attributes: SAttributesInterface[],
  selected_options?: string[],
  sku: string,
  small_image: SmallImageInterface,
  url: string,
  variants?: {
    product: ProductInterface
  }[]
}

declare interface PageInfoInterface {
  total_pages: number
}

declare interface ProductsInformationInterface {
  aggregations: AggregationsInterface[],
  page_info: PageInfoInterface,
  sort_fields: {
    default: string,
    options: { label: string, value: string }[]
  },
  total_count: number
}
