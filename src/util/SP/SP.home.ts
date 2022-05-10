import store from '@store/index';
import SPAbstract from '@util/SP/SP.abstract';

class SPHome extends SPAbstract {
    async initial(): Promise<void> {
        await super.initial();
        const { config: { cms_home_page } } = store.getState().config;
        if (cms_home_page) {
            await this.getCmsPage({ identifier: cms_home_page });
        }
    }
}

export default SPHome;
