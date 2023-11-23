import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

function ScrollToTopBtn() {
  const scrollToTopBtnRef = useRef(null);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 스크롤이 일정 이상 내려갔을 때 버튼을 보여줌
    if (!scrollToTopBtnRef.current) return;
    if (window.scrollY > 150) {
      scrollToTopBtnRef.current.style.scale = '1';
    } else {
      // 스크롤이 일정 이하로 올라갔을 때 버튼을 숨김
      scrollToTopBtnRef.current.style.scale = '0';
    }
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 스크롤을 맨 위로 이동하는 핸들러
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
  background-color: #007bff;
  box-shadow: var(--box-shadow);
  scale: 0;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    scale: 1.1;
    background-color: #3c9aff;
  }
`;
