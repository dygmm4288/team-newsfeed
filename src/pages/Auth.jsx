import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import signInBGImg from '../assets/background/signIn.jpg';
import { useAuth } from '../contexts/auth.context';
import useModal from '../hooks/useModal';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { alertModal } = useModal();

  const navigate = useNavigate();
  const {
    userInfo,
    error,
    signInWithEmail,
    signInWithGithub,
    signInWithGoogle
  } = useAuth();

  const signInBG = async (event) => {
    event.preventDefault();

    signInWithEmail(email, password);
  };
  useEffect(() => {
    if (!userInfo || error) return;
    alertModal({ name: '로그인 성공', content: '로그인에 성공했습니다.' });
    navigate('/');
  }, [userInfo, error]);

  return (
    <>
      <StContainer>
        <StH1Box>
          <h1>음악을 사랑하는 사람들의 커뮤니티</h1>
          <h1>
            ⚡ 여러분의 이야기를 <span>Beat Up</span> 해주세요! ⚡
          </h1>
        </StH1Box>
        <StSignInWrapper>
          <StSignInLeft>
            <img src={signInBGImg} alt="signInBG"></img>
          </StSignInLeft>
          <StSignInRight>
            <StSignInForm onSubmit={signInBG}>
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
                <button type="submit">Login</button>
                <button type="button" onClick={() => signInWithGithub()}>
                  Github
                </button>
                <button type="button" onClick={() => signInWithGoogle()}>
                  Google
                </button>
              </StSignInBtnBox>
              <StGoToSignUpPage>
                <Link to="/sign-up">
                  <p>회원가입</p>
                </Link>
              </StGoToSignUpPage>
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

const StH1Box = styled.div`
  position: absolute;
  top: 17%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 25px;

  span {
    color: #ff5b22;
    font-weight: 700;
  }
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

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #2c2c2c inset;
      -webkit-text-fill-color: #fff;
    }
  }
`;

const StSignInBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  height: 28%;

  button:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 49px;
    font-size: 16px;
    text-align: center;
    background: transparent;
    color: #ff5b22;
    border: 2px solid #ff5b22;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      scale: 1.05;
      color: #ff5b22;
      box-shadow: 0 0 5px #ff5b22;
      background-color: black;
    }

    &:active {
      scale: 0.95;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 49px;
    font-size: 16px;
    text-align: center;
    background: transparent;
    color: #acacac;
    border: 2px solid #acacac;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      scale: 1.05;
      color: #acacac;
      box-shadow: 0 0 5px #ffffff;
      background-color: black;
    }

    &:active {
      scale: 0.95;
    }
  }
`;

const StGoToSignUpPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;

  p {
    color: #acacac;
    font-size: 12px;
  }
`;
