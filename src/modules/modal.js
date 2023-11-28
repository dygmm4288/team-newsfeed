import createReducer from '../lib/createReducer';
export const TYPE_CONFIRM = 'confirm';
export const TYPE_ALERT = 'alert';
// 액션 타입
const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';
const EXECUTE_CONFIRM = 'modal/SET_CONFIRM';
// ? 네이밍이 마음에 걸린다. confirm 모달의 경우 확인을 눌렀을 경우에 동작을 진행해라 라는 의미인데
// ? 어차피 Button에 들어가야하는 거니까  HandleConfirm? 아니면 처음처럼 confirm action?
const HANDLE_CONFIRM = 'modal/HANDLE_CONFIRM';

// 액션 생성자 함수
export const openModal = ({
  name,
  openType,
  content,
  errorContent,
  onConfirm
}) => ({
  type: OPEN_MODAL,
  payload: { name, openType, content, errorContent, onConfirm }
});
export const closeModal = () => ({ type: CLOSE_MODAL });
export const executeConfirm = () => ({
  type: EXECUTE_CONFIRM
});
export const handleConfirm = () => ({ type: HANDLE_CONFIRM });

// 초기 상태
const initialState = {
  isModalOpen: false,
  openType: 'alert',
  name: '',
  content: '',
  errorContent: '',
  confirmLogic: null,
  onConfirm: null
};
// 리듀서
const reducer = createReducer(initialState, {
  [OPEN_MODAL]: (state, action) => {
    const { name, openType, content, onConfirm, errorContent } = action.payload;
    return {
      isModalOpen: true,
      openType,
      name,
      content,
      errorContent,
      onConfirm
    };
  },
  [HANDLE_CONFIRM]: (state, action) => {
    if (state.onConfirm) state.onConfirm();
    return {
      ...initialState
    };
  },
  [CLOSE_MODAL]: (state, action) => {
    return {
      ...initialState
    };
  }
});
export const selectModalState = (state) => state.modalReducer;
export const selectIsModalOpen = (state) => state.modalReducer.isModalOpen;

export default reducer;
