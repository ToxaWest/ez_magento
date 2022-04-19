import store from 'Store/index';
import SPAbstract from 'Util/SP/SP.abstract';

class SPHome extends SPAbstract {
    async initial() {
        await super.initial();
        const { config: { cms_home_page } } = store.getState().config;
        if (cms_home_page) {
            await this.getCmsPage({ identifier: cms_home_page });
        }
    }
}

export default SPHome;
