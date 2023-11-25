import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/auth.context';
import signInBGImg from '../assets/background/signIn.jpg';

export default function Auth() {
  //이메일, 비밀번호
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();

  const signInBG = async (event) => {
    event.preventDefault();

    signInWithEmail(email, password)
      .then(() => {
        alert('로그인에 성공했습니다.');
        navigate('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found' || 'auth/wrong-password':
            return alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
          case 'auth/network-request-failed':
            return alert('네트워크 연결에 실패 하였습니다.');
          case 'auth/internal-error':
            return alert('잘못된 요청입니다.');
          default:
            return alert('로그인에 실패 하였습니다.');
        }
      });
  };
  return (
    <>
      <StContainer>
        <StSignInWrapper>
          <StSignInLeft>
            <img src={signInBGImg} alt="signInBG"></img>
          </StSignInLeft>
          <StSignInRight>
            <StSignInForm>
              <StSignInInputBox>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </StSignInInputBox>
              <StSignInBtnBox>
                <button type="submit" onClick={signInBG}>
                  Login
                </button>
              </StSignInBtnBox>
              <StGoToSignupPage>
                <Link to="/signup">
                  <p>회원가입</p>
                </Link>
              </StGoToSignupPage>
            </StSignInForm>
          </StSignInRight>
        </StSignInWrapper>
      </StContainer>
    </>
  );
}

const StContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StSignInWrapper = styled.div`
  width: 800px;
  height: 400px;
  display: flex;
  align-items: center;
  border: 2px solid black;
  background-color: #2c2c2c;
  border: none;
  box-shadow: 3px 3px 8px black;
`;

const StSignInLeft = styled.form`
  width: 400px;
  height: 400px;
  border: 1px solid black;

  img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    object-position: 50% 64%;
  }
`;

const StSignInRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

const StSignInForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const StSignInInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 45%;

  input {
    width: 70%;
    height: 30px;
    padding: 7px 15px;
    font-size: 20px;
    border: none;
    border-bottom: 2px solid black;
    background-color: #2c2c2c;
    font-size: 20px;
    text-align: center;
    outline: none;
    color: white;

    &::placeholder {
      font-size: 25px;
    }

    /* 자동완성 시 텍스트 및 배경 색 컨트롤 */
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #2c2c2c inset;
      -webkit-text-fill-color: #fff;
    }
  }
`;

const StSignInBtnBox = styled.div`
  display: flex;
  align-items: center;
  height: 20%;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    background-color: black;
    color: #ff5b22;
    border: 2px solid #ff5b22;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      scale: 1.05;
      color: #ff5b22;
      box-shadow: 0 0 5px #ff5b22;
    }

    &:active {
      scale: 0.95;
    }
  }
`;

const StGoToSignupPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  p {
    color: #acacac;
    font-size: 12px;
  }
`;
