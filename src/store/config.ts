import { createSlice } from '@reduxjs/toolkit';

export interface availableStoreInterface {
 default_display_currency_code: string, lang_prefix: string, store_name: string
}

export interface StoreConfigInterface {
    address_lines_quantity: number,
    anchor_text_for_next?: string,
    anchor_text_for_previous?: string,
    base_url: string,
    cms_home_page?: string | undefined | null,
    content_customization_header_menu?: string,
    default_country: string,
    default_description: string,
    default_keywords: string,
    default_title: string,
    guest_checkout: boolean,
    header_logo_src: string,
    lang_prefix: string,
    locale: string,
    logo_alt: string,
    logo_height: number,
    logo_width: number,
    magento_wishlist_general_is_enabled: string,
    mfblog_permalink_route: string,
    mfblog_top_menu_include_categories: number,
    mfblog_top_menu_item_text: string,
    name: string,
    pagination_frame: number,
    pagination_frame_skip: number,
    region_display_all: boolean,
    secure_base_media_url: string,
    secure_base_url: string,
    show_cms_breadcrumbs: boolean,
    store_code: string,
    title_prefix: string,
    title_separator: string,
    title_suffix: string
}

export interface configReducerInterface {
    availableStores: availableStoreInterface[],
    config: StoreConfigInterface,
    menu: { [key: string]: MenuItem[] }
}

const getInitialState = (): configReducerInterface => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.config as configReducerInterface;
    }

    return {
        availableStores: [],
        config: {} as StoreConfigInterface,
        menu: {}
    };
};

export const configReducer = createSlice({
    initialState: getInitialState(),
    name: 'config',
    reducers: {
        updateConfig: (state, { payload }: { payload: StoreConfigInterface }) => {
            state.config = payload;
        },
        updateMenu: (state, { payload }: { payload: { [key: string]: MenuItem[] } }) => {
            state.menu = { ...state.menu, ...payload };
        },
        updateStoreList: (state, { payload }) => {
            state.availableStores = payload;
        }
    }
});

export const {
    updateConfig,
    updateMenu,
    updateStoreList
} = configReducer.actions;

export default configReducer.reducer;
