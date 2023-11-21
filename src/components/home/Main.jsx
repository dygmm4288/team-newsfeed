import React from 'react';
import styled from 'styled-components';

function Main() {
  return (
    <StContainer>
      <div>Main</div>
    </StContainer>
  );
}

export default Main;

const StContainer = styled.div`
  width: 75%;
  border: 2px solid black;
`;
