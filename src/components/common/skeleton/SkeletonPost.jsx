import React from 'react';
import styled, { keyframes } from 'styled-components';
import { StPost } from '../../home/Post';
function SkeletonPost() {
  return (
    <StSkeletonPostWrapper>
      <StSkeletonCircle />
      <StSkeletonLine />
      <StSkeletonContent>
        <StSkeletonContentLine size={3} twinkleTime={0.6} />
        <StSkeletonContentLine size={4} twinkleTime={0.8} />
        <StSkeletonContentLine size={5} />
      </StSkeletonContent>
    </StSkeletonPostWrapper>
  );
}

export default SkeletonPost;

const twinkle = keyframes`
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
const StSkeletonPostWrapper = styled(StPost)`
  display: grid;
  grid-template-columns: var(--img-size) 1fr;
  grid-template-rows: var(--img-size) 1fr;

  grid-template-areas:
    'img line'
    'content content';
  gap: 0.5rem;
  padding: 1rem;
`;
const StSkeletonCircle = styled(StTwinkleDiv)`
  width: var(--img-size);
  height: var(--img-size);
  background-color: gray;

  grid-area: img;
  border-radius: 50%;
`;
const StSkeletonLine = styled(StTwinkleDiv)`
  border-radius: 1rem;
  background-color: gray;
  grid-area: line;
  border-radius: 3rem;
  margin-left: 1rem;
`;
const StSkeletonContent = styled(StTwinkleDiv)`
  background-color: darkgray;
  grid-area: content;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  row-gap: 2rem;
  padding: 1rem;

  border-radius: 0.5rem;
`;
const StSkeletonContentLine = styled(StTwinkleDiv)`
  background-color: gray;
  grid-column: 1 / ${(props) => props.size + 1};

  border-radius: 3rem;
`;
