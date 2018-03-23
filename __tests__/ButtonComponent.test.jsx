import React from 'react';
import shallowToJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import CustomButton  from '../src/Components/Button/Button.Component';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from   'prop-types';

describe('ButtonComponent Test',() => {
    it('Should render Button Component', () => {
        const button = shallow(<CustomButton label={'Cancel'}/>,
        {
            context: {
                muiTheme: getMuiTheme()
            },
            childContextTypes: {
                muiTheme: PropTypes.object.isRequired
            }
        });

        const tree = shallowToJSON(button);
        expect(tree).toMatchSnapshot();
    });
});