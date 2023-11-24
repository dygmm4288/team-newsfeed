import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/auth.context';

export default function SignUp() {
  const [formState, setFormState] = useState({
    nickname: '',
    password: '',
    email: ''
  });
  const { email, password, nickname } = formState;
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
          <Logo>
            <p>BeatBridge</p>
          </Logo>
          <Form>
            <Input>
              Email :{' '}
              <input
                type="email"
                value={email}
                name="email"
                onChange={onChange}
                required
              ></input>
              <br />
              PassWord :{' '}
              <input
                type="password"
                value={password}
                name="password"
                onChange={onChange}
                required
              ></input>
              <br />
              Repeat Pwd : <input type="password"></input>
              <br />
              NickName :{' '}
              <input
                type=""
                value={nickname}
                name="nickname"
                onChange={onChange}
                required
              ></input>
            </Input>
          </Form>
          <BtnWrapper>
            <button onClick={signUp}>Sign Up</button>
          </BtnWrapper>
          <Link to="/auth">
            <p>로그인화면으로이동</p>
          </Link>
        </StSignUpLeft>
        <StSignUpRight>
          <img src="" alt="사람이 기타를 치고 있는 그림"></img>
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
  border: 2px solid black;
`;
const StSignUpWrapper = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  align-items: center;
  border: 2px solid black;
  position: relative;
`;
const StSignUpLeft = styled.form`
  width: 400px;
  height: 300px;
  border: 1px solid black;
`;
const StSignUpRight = styled.div`
  width: 400px;
  height: 300px;
  border: 1px solid black;
`;
const Logo = styled.div`
  width: 400px;
  height: 80px;
  border: 1px solid black;
  & p {
    font-size: larger;
    text-align: center;
  }
`;
const Form = styled.div`
  height: 150px;
  border: 1px solid black;
  align-items: center;
  text-align: center;
  justify-content: center;
  position: relative;
`;
const Input = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & button {
    background-color: black;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;
