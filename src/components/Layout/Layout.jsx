import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import ScrollToTopBtn from './ScrollToTopBtn';

export default function Layout() {
  return (
    <>
      <Header />
      <StMainWrapper>
        <Outlet />
      </StMainWrapper>
      <ScrollToTopBtn />
    </>
  );
}

const StMainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
