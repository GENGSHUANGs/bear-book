import { fromJS } from 'immutable';
const INITIAL_STATE = fromJS({
  now: undefined,
});

export default function counter(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_NOW':
      return state.setIn(['now'], payload.now);
    default:
      return state;
  }
}
