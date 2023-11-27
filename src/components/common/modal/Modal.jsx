import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  TYPE_CONFIRM,
  closeModal,
  executeConfirm,
  selectModalState
} from '../../../modules/modal';

export default function Modal() {
  const { isModalOpen, name, content, errorContent, openType } =
    useSelector(selectModalState);
  const dispatch = useDispatch();
  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const handleExecuteConfirm = useCallback(() => {
    dispatch(executeConfirm());
  }, []);
  return (
    <StModalOverlay
      isModalOpen={isModalOpen}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        handleCloseModal();
      }}
    >
      {isModalOpen && (
        <StModal>
          <StModalHeader>
            <h1>{name}</h1>
          </StModalHeader>
          <StModalMain>
            <p>{content}</p>
            <p>{errorContent}</p>
          </StModalMain>
          <StModalFooter>
            {openType === TYPE_CONFIRM && (
              <StConfirmBtn onClick={handleExecuteConfirm}>확인</StConfirmBtn>
            )}
            <StCancelBtn onClick={handleCloseModal}>
              {openType === TYPE_CONFIRM ? '취소' : '확인'}
            </StCancelBtn>
          </StModalFooter>
        </StModal>
      )}
    </StModalOverlay>
  );
}

const StModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  ${(props) =>
    !props.isModalOpen
      ? `opacity: 0;pointer-events:none;`
      : `opacity: 1;pointer-events:auto;`}
  transition: 0.2s ease-in-out;
  display: flex;
`;
const StModal = styled.section`
  width: 500px;
  height: 300px;
  background-color: white;
  margin: auto;

  border-radius: 1rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const StModalHeader = styled.header`
  text-align: center;
  background-color: black;
  padding: 1rem 0rem;
  border-radius: 0.5rem;
  h1 {
    color: white;
    font-weight: bold;
  }
`;
const StModalMain = styled.main`
  flex: 1;
  padding-top: 2rem;
  p {
    font-weight: bold;
    padding: 1rem;
    text-align: center;
  }
  p:last-child {
    font-weight: 500;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
  }
`;
const StModalFooter = styled.footer`
  padding: 1rem 0rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const StModalBtn = styled.button`
  border: none;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem 2rem;

  &:hover {
    box-shadow: 1px 1px 6px #000000;
    scale: 1.005;
    opacity: 1;
  }
`;
const StConfirmBtn = styled(StModalBtn)`
  background-color: #ff5b22;
  color: white;
  &:hover {
    box-shadow: 1px 1px 6px #000000;
    scale: 1.005;
    opacity: 1;
  }
`;
const StCancelBtn = styled(StModalBtn)``;
