import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

function ScrollToTopBtn() {
  const scrollToTopBtnRef = useRef(null);

  const handleScroll = () => {
    if (!scrollToTopBtnRef.current) return;
    if (window.scrollY > 150) {
      scrollToTopBtnRef.current.style.scale = '1';
    } else {
      scrollToTopBtnRef.current.style.scale = '0';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = useCallback(() => {
    if (scrollToTopBtnRef.current) {
      document.documentElement.scrollTop = 0;
    }
  }, []);

  return (
    <StScrollToTopBtn ref={scrollToTopBtnRef} onClick={handleScrollToTop}>
      ▲
    </StScrollToTopBtn>
  );
}

export default ScrollToTopBtn;

const StScrollToTopBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  border: none;
  color: #fff;
  background-color: #ff5b22;
  box-shadow: var(--box-shadow);
  transition: 0.2s ease-in-out;
  scale: 0;
  cursor: pointer;

  &:hover {
    scale: 1.2;
  }
`;
