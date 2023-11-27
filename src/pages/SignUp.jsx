import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import signupImg from '../assets/background/signUp.jpg';
import { useAuth } from '../contexts/auth.context';
import useModal from '../hooks/useModal';

export default function SignUp() {
  const [formState, setFormState] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const { email, password, nickname, confirmPassword } = formState;
  const navigate = useNavigate();
  const { signUpByEmail, userInfo, error } = useAuth();
  const { alertModal } = useModal();

  const handleChangeFormState = (event) => {
    const {
      target: { name, value }
    } = event;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const signUp = (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      setFormState((prev) => ({ ...prev, password: '', confirmPassword: '' }));
      alertModal({
        name: '비밀번호 오류',
        content: '비밀번호가 일치하지 않습니다.'
      });
      return;
    }
    signUpByEmail(email, password, nickname);
  };
  useEffect(() => {
    if (!userInfo || error) return;
    alertModal({ name: '회원가입 성공', content: '회원가입에 성공했습니다.' });
    navigate('/');
  }, [userInfo, error]);

  return (
    <StContainer>
      <StSignUpWrapper>
        <StFormWrapper onSubmit={signUp}>
          <StFormContainer>
            <StInput
              type="email"
              value={email}
              name="email"
              onChange={handleChangeFormState}
              placeholder={'Email'}
              required
            ></StInput>
            <StInput
              type="password"
              value={password}
              name="password"
              onChange={handleChangeFormState}
              placeholder={'Password'}
              required
            ></StInput>
            <StInput
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChangeFormState}
              placeholder={'Repeat Password'}
              required
            ></StInput>
            <StInput
              type=""
              value={nickname}
              name="nickname"
              onChange={handleChangeFormState}
              placeholder={'Nickname'}
              required
            ></StInput>
          </StFormContainer>
          <StBtnWrapper>
            <StSignUpBtn>Sign Up</StSignUpBtn>
            <Link to="/auth">
              <StGoToLogIn>로그인 화면으로 이동</StGoToLogIn>
            </Link>
          </StBtnWrapper>
        </StFormWrapper>
        <StSignUpRight>
          <StSignUpImg src={signupImg} alt="사람이 기타를 치고 있는 그림" />
        </StSignUpRight>
      </StSignUpWrapper>
    </StContainer>
  );
}
const StContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const StSignUpWrapper = styled.div`
  width: 800px;
  height: 400px;
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  color: white;
  box-shadow: 3px 3px 8px black;
`;

const StFormWrapper = styled.form`
  width: 400px;
  height: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: #2c2c2c;
  color: black;
`;
const StSignUpRight = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

const StFormContainer = styled.div`
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0 0 0;
  gap: 15px;
`;

const StBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 35%;
  padding-bottom: 20px;
`;

const StSignUpImg = styled.img`
  height: 400px;
  width: 400px;
  object-fit: cover;
`;

const StGoToLogIn = styled.p`
  font-size: 12px;
  color: #acacac;
  margin-top: 10px;
`;

const StInput = styled.input`
  width: 70%;
  height: 30px;
  padding: 7px 15px;
  border: none;
  border-bottom: 2px solid black;
  background-color: #2c2c2c;
  font-size: 20px;
  text-align: center;
  color: white;
  outline: none;
  &::placeholder {
    font-size: 25px;
    text-align: center;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #2c2c2c inset;
    -webkit-text-fill-color: white;
  }
`;

const StSignUpBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 220px;
  font-size: 16px;
  text-align: center;
  background-color: #000000;
  color: #ff5b22;
  border: 1px solid #ff5b22;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    scale: 1.05;
    color: #ff5b22;
    box-shadow: 0 0 6px #ff5b22;
  }
  &:active {
    scale: 0.95;
  }
`;
