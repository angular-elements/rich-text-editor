import { loadDefaultConfig } from './config-default';

describe('Config Loader', () => {
    it('Can load the default configuration, given an empty config object.', () => {
        const config = loadDefaultConfig();
        expect(config.editable).toEqual(true);
    });
});
