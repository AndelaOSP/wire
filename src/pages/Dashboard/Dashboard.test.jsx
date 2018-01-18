import React from 'react';
import { shallow } from 'enzyme';

import shallowWithStore from '../../../test/shallowWithStore';
import store from '../../../test/testStore';

import Dashboard from '../Dashboard/Dashboard.Component';

describe('a passing test', () => {
    it('should pass', () => {
        expect(true).to.be.true;
    });
    it('should render dashboard component', () => {
        const wrapper = shallowWithStore(<Dashboard />, store);
        expect(wrapper).to.be.a('object');
    });
});
