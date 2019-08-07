import * as ActionTypes from './actionTypes';
import * as ActionCreators from './LoadingAction';

describe('Should implement the loader', () => {
  it('should implement the loader', () => {
    const status = {'status': true, 'type': 'IS_LOADING'}
    const expected = {
      type: ActionTypes.IS_LOADING,
      status,
    };
    const actual = ActionCreators.loadingAction(status);

    expect(typeof (ActionCreators.loadingAction(status))).toEqual('object');
    expect(actual).toEqual(expected);
  });
});
