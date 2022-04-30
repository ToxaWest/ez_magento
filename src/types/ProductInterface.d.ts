declare interface SmallImageInterface {
  label: string,
  url: string
}

declare interface MediaGalleryInterface {
  disabled: boolean,
  url: string,
  label: string
}

declare interface FinalPriceInterface {
  value: number,
  currency: string
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
  attribute_label: string,
  attribute_code: string,
  attribute_type: string,
  attribute_value: string,
  attribute_options: {
    value: string
    label: string
  }[]
}

declare interface ProductInterface {
  name: string,
  id: number,
  price_range: ProductPriceRangeInterface,
  sku: string,
  s_attributes: SAttributesInterface[],
  media_gallery: MediaGalleryInterface[],
  small_image: SmallImageInterface,
  url: string,
  __typename: 'SimpleProduct',
  categories: CategoryInterface[]
}
