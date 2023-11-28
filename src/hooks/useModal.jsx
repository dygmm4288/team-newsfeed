import { useDispatch } from 'react-redux';
import {
  openModal as openModalAction,
  TYPE_ALERT,
  TYPE_CONFIRM
} from '../modules/modal';

export default function useModal() {
  const dispatch = useDispatch();

  const openModal = (openType) => (args) =>
    dispatch(openModalAction({ openType, ...args }));

  const alertModal = openModal(TYPE_ALERT);
  const confirmModal = openModal(TYPE_CONFIRM);

  return { alertModal, confirmModal };
}
