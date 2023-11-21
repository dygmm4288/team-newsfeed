import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';

function Main() {
  return (
    <StContainer>
      <div>
        <input placeholder="어떤 이야기를 나누고 싶나요?" />
      </div>
      <StPostBox>
        <StPost>
          <StPostTop>
            <img src={ProfilePicture} alt="ProfilePicture" />
            <p>아이디</p>
          </StPostTop>
          <StPostBottom>
            <button>···</button>
            <p>내용</p>
          </StPostBottom>
        </StPost>

        <StPost>
          <StPostTop>
            <img src={ProfilePicture} alt="ProfilePicture" />
            <p>아이디</p>
          </StPostTop>
          <StPostBottom>
            <button>···</button>
            <p>내용 test</p>
          </StPostBottom>
        </StPost>
      </StPostBox>
    </StContainer>
  );
}

export default Main;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  border: 2px solid black;
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StPost = styled.li`
  width: 350px;
  min-height: 250px;
  border: 2px solid black;
`;

const StPostTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20%;
  padding: 0 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const StPostBottom = styled.div`
  position: relative;
  height: 80%;
  padding: 15px;
  border: 2px solid blue;
  border-radius: 20px;

  button {
    position: absolute;
    right: 4%;
  }

  p {
    height: 100%;
    padding-bottom: 20px;
  }
`;
