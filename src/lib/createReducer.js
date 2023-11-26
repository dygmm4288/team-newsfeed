export default function createReducer(initialState, handlerMap) {
  return (state = initialState, action) => {
    const handler = handlerMap[action.type];
    if (!handler) return state;
    return handler(state, action);
  };
}
