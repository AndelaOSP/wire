import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();

const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

export default shallowWithStore;
