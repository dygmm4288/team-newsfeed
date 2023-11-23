import styled, { keyframes } from 'styled-components';
export const twinkle = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const StTwinkleDiv = styled.div`
  animation: ${twinkle} ${(props) => props.twinkleTime || 1}s infinite
    ease-in-out;
`;
export default StTwinkleDiv;
