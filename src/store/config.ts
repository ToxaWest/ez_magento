import { menuItemInterface } from '@component/Menu/Menu.component';
import { createSlice } from '@reduxjs/toolkit';

export interface availableStoreInterface {
 lang_prefix: string, store_name: string, default_display_currency_code: string
}

export interface StoreConfigInterface {
    mfblog_top_menu_include_categories: number,
    mfblog_permalink_route: string,
    mfblog_top_menu_item_text: string,
    content_customization_header_menu?: string,
    logo_alt: string,
    magento_wishlist_general_is_enabled: string,
    secure_base_url: string,
    logo_height: number,
    logo_width: number,
    header_logo_src: string,
    name: string,
    lang_prefix: string,
    pagination_frame: number,
    pagination_frame_skip: number,
    anchor_text_for_previous?: string,
    anchor_text_for_next?: string
    show_cms_breadcrumbs: boolean,
    cms_home_page?: string | undefined | null,
    guest_checkout: boolean,
    default_country: string,
    address_lines_quantity: number,
    region_display_all: boolean,
    store_code: string,
    secure_base_media_url: string,
    base_url: string,
    locale: string,
    title_prefix: string,
    title_suffix: string,
    title_separator: string,
    default_title: string,
    default_description: string,
    default_keywords: string
}

export interface MenuInterface {
    children: menuItemInterface[],
    include_in_menu: number,
    item_id: string,
    parent_id: number,
    title: string,
    url: string
}

export interface MenuNormalizedInterface {
    [key: string]: MenuInterface[]
}

export interface configReducerInterface {
    availableStores: availableStoreInterface[],
    config: StoreConfigInterface,
    menu: MenuNormalizedInterface
}

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.config as configReducerInterface;
    }

    return {
        availableStores: [],
        config: {},
        menu: {}
    };
};

export interface menuChildInterface {
    item_id: number,
    children: menuChildInterface[],
    include_in_menu: boolean
}

export const configReducer = createSlice({
    initialState: getInitialState() as configReducerInterface,
    name: 'config',
    reducers: {
        updateConfig: (state, { payload }: { payload: StoreConfigInterface }) => {
            state.config = payload;
        },
        updateMenu: (state, { payload }: { payload: MenuNormalizedInterface }) => {
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
