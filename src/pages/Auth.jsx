import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/auth.context';

export default function Auth() {
  //이메일, 비밀번호
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();

  const signIn = async (event) => {
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
        <StSignUpWrapper>
          <StSignUpLeft>
            <img src="" alt="기타 그림"></img>
          </StSignUpLeft>
          <StSignUpRight>
            <Logo>
              <p>BeatBrdge</p>
            </Logo>
            <Form>
              <Input>
                Email :{' '}
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                PassWord :{' '}
                <input
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Input>
              <BtnWrapper>
                <button type="submit" onClick={signIn}>
                  Login
                </button>
              </BtnWrapper>
            </Form>
            <Link to="/signup">
              <p>회원가입</p>
            </Link>
            <Link to="">
              <p>비밀번호찾기</p>
            </Link>
          </StSignUpRight>
        </StSignUpWrapper>
      </StContainer>
    </>
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
