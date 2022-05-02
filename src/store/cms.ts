import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CmsPageInterface {
    content?: string
}

export interface SlideInterface { desktop_image: string, slide_text: string, slide_id: string }

export interface SliderInterface {
    slides: SlideInterface[],
    show_menu: boolean,
    show_navigation: boolean,
    slide_speed: number,
    slides_to_display: number
}

export interface WidgetInterface {
    [key: string]: SliderInterface | CategoryInterface[] | { items: ProductInterface[] }
}

interface cmsReducerInterface {
    block: object,
    widget: WidgetInterface,
    page: CmsPageInterface
}

const getInitialState = () => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return window.__NEXT_DATA__.props.pageProps.state.cms as cmsReducerInterface;
    }

    return {
        block: {},
        page: {},
        widget: {}
    } as cmsReducerInterface;
};

export const cmsReducer = createSlice({
    initialState: getInitialState(),
    name: 'cms',
    reducers: {
        updatePage: (state, action) => {
            state.page = action.payload;
        },
        updateWidget: (state, { payload }: PayloadAction<WidgetInterface>) => {
            state.widget = { ...state.widget, ...payload };
        }
    }
});

export const { updatePage, updateWidget } = cmsReducer.actions;

export default cmsReducer.reducer;
