export function getNow() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'SET_NOW',
        payload: {
          now: Date.now(),
        },
      });
    }, 2000);
  };
}
