import { useDispatch } from 'react-redux';
import { openAlertModal, openConfirmModal } from '../modules/modal';

export default function useModal() {
  const dispatch = useDispatch();

  const alertModal = ({ name, content, errorContent }) =>
    dispatch(openAlertModal({ name, content, errorContent }));
  const confirmModal = ({ name, content, confirmLogic }) =>
    dispatch(openConfirmModal({ name, content, confirmLogic }));

  return { alertModal, confirmModal };
}
