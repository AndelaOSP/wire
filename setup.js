/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  
  getItem(key) {
    return this.store[key] || 'foo';
  }

  setItem(key, val) {
    return val || '';
  }

  clear() {
    return '';
  }
}

global.localStorage = new LocalStorageMock();
