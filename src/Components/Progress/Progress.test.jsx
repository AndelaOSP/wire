import React from 'react';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import Progress from './Progress.Component';

describe('Progress component', () => {
  it('should render without crashing', () => {
    const progress = shallow(<Progress />);
    expect(shallowToJSON(progress)).toMatchSnapshot();
  });

  it('should render CircularProgress component', () => {
    const progress = shallow(<Progress />);
    const progressContainer = progress.find('.progress-container');
    const circularProgress = progress.find('CircularProgress');
    expect(progressContainer.length).toEqual(1);
    expect(circularProgress.length).toEqual(1);
  });
});
