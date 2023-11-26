import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../common/modal/Modal';
import Header from './Header';
import ScrollToTopBtn from './ScrollToTopBtn';

import { Provider } from 'react-redux';
import store from '../../modules/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <Header />
      <StMainWrapper>
        <Outlet />
      </StMainWrapper>
      <ScrollToTopBtn />
      <Modal />
    </Provider>
  );
}

const StMainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
