import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/auth.context';
import signupImg from '../assets/background/signUp.jpg';

export default function SignUp() {
  const [formState, setFormState] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const { email, password, nickname, confirmPassword } = formState;
  const navigate = useNavigate();
  const { signUpByEmail } = useAuth();

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const signUp = (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    signUpByEmail(email, password, nickname)
      .then(() => {
        alert('회원가입에 성공했습니다.');
        navigate('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return alert('이미 사용 중인 이메일입니다.');
          case 'auth/internal-error':
            return alert('잘못된 요청입니다.');
          case 'auth/weak-password':
            return alert('비밀번호는 6글자 이상이어야 합니다.');
          case 'auth/network-request-failed':
            return alert('네트워크 연결에 실패 하였습니다.');
          case 'auth/invalid-email':
            return alert('잘못된 이메일 형식입니다.');
          default:
            return alert('회원가입에 실패했습니다.');
        }
      });
  };

  return (
    <StContainer>
      <StSignUpWrapper>
        <StSignUpLeft>
          <Form>
            <Input
                type="email"
                value={email}
                name="email"
                onChange={onChange}
                placeholder={"Email"}
                required
            ></Input>
            <Input
                type="password"
                value={password}
                name="password"
                onChange={onChange}
                placeholder={"Password"}
                required
            ></Input>
            <Input
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onChange}
                placeholder={"Repeat Password"}
                required
              ></Input>

              <Input
                type=""
                value={nickname}
                name="nickname"
                onChange={onChange}
                placeholder={"Nickname"}
                required
            ></Input>
          </Form>
          <BtnWrapper>
            <SignUpBtn onClick={signUp}>Sign Up</SignUpBtn>
            <Link to="/auth">
              <GoToLogIn>로그인 화면으로 이동</GoToLogIn>
            </Link>
          </BtnWrapper>

        </StSignUpLeft>
        <StSignUpRight>
          <SignUpImg src={signupImg} alt="사람이 기타를 치고 있는 그림" />
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
  /* border: 2px solid black; */
  height: 100vh;
`;
const StSignUpWrapper = styled.div`
  width: 800px;
  height: 400px;
  display: flex;
  align-items: center;
  background-color: #2C2C2C;
  color: white;
  box-shadow: 3px 3px 8px black;
`;

const StSignUpLeft = styled.form`
  width: 400px;
  height: 400px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: #2C2C2C;
  color: black;
`;
const StSignUpRight = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

const Form = styled.div`
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0 0 0;
  gap: 15px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 35%;
  padding-bottom: 20px;
`;

const SignUpImg = styled.img`
  height: 400px;
  width: 400px;
  object-fit: cover;
`;

const GoToLogIn = styled.p`
  font-size: 12px;
  color: #acacac;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 70%;
  height: 30px;
  padding: 7px 15px;
  border: none;
  border-bottom: 3px solid black;
  background-color: #2C2C2C;
  font-size: 20px;
  text-align: center;
  color: white;
  outline: none;
  &::placeholder{
    font-size: 25px;
    text-align: center;
  }
  &::-webkit-autofill {
    -webkit-box-showdow: 000 1000px #2c2c2c inset;
    -webkit-text-fill-color: white;
  }
`;

const SignUpBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 220px;
  font-size: 16px;
  text-align: center;
  background-color: #000000;
  color: #FF5B22;
  border: 1px solid #FF5B22;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
      scale: 1.05;
      color: #FF5B22;
      box-shadow: 0 0 6px #FF5B22;
    }
    &:active {
      scale: 0.95;
    }
`;