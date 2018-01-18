import { createMockStore } from 'redux-test-utils';

const testStore = {
  incidents: [],
};

const store = createMockStore(testStore);

export default store;
