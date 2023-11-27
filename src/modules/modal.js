import createReducer from '../lib/createReducer';
export const TYPE_CONFIRM = 'confirm';
export const TYPE_ALERT = 'alert';
// 액션 타입
const OPEN_ALERT_MODAL = 'modal/OPEN_ALERT_MODAL';
const OPEN_CONFIRM_MODAL = 'modal/OPEN_CONFIRM_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';
const EXECUTE_CONFIRM = 'modal/SET_CONFIRM';

// 액션 생성자 함수
export const openAlertModal = ({ name, content, errorContent }) => ({
  type: OPEN_ALERT_MODAL,
  payload: { name, content, errorContent }
});
export const openConfirmModal = ({ name, content, confirmLogic }) => ({
  type: OPEN_CONFIRM_MODAL,
  payload: { name, content, confirmLogic }
});
export const closeModal = () => ({ type: CLOSE_MODAL });
export const executeConfirm = () => ({
  type: EXECUTE_CONFIRM
});

// 초기 상태
const initialState = {
  isModalOpen: false,
  openType: 'alert',
  name: '',
  content: '',
  errorContent: '',
  confirmLogic: null
};
// 리듀서
const reducer = createReducer(initialState, {
  [OPEN_ALERT_MODAL]: (state, action) => {
    const { name, content, errorContent } = action.payload;
    return {
      isModalOpen: true,
      openType: TYPE_ALERT,
      name,
      content,
      errorContent,
      confirmLogic: null
    };
  },
  [OPEN_CONFIRM_MODAL]: (state, action) => {
    return {
      ...state,
      isModalOpen: true,
      openType: TYPE_CONFIRM,
      name: action.payload.name,
      content: action.payload.content,
      confirmLogic: action.payload.confirmLogic
    };
  },
  [CLOSE_MODAL]: (state, action) => {
    return {
      ...state,
      isModalOpen: false,
      name: '',
      content: '',
      errorContent: '',
      confirmLogic: null
    };
  },
  [EXECUTE_CONFIRM]: (state, action) => {
    console.log(state, action);
    if (state.confirmLogic) state.confirmLogic();
    return {
      ...state,
      isModalOpen: false,
      confirmLogic: null,
      name: '',
      content: ''
    };
  }
});
export const selectModalState = (state) => state.modalReducer;
export const selectIsModalOpen = (state) => state.modalReducer.isModalOpen;

export default reducer;
