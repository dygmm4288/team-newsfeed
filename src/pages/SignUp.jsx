import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/auth.context';
import { auth } from '../firebase/firebase.config';

export default function SignUp() {
  // 이메일, 비밀번호, 닉네임
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo } = useAuth();
  // const [repeatPwd , setRepeatPwd] = useState("");
  const [nickname, setNickname] = useState('');

  // //오류메세지 상태저장
  // const [passwordConfirmNessage , setPasswordMessage] = useState<String>('');

  // //유효성 검사
  // const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'nickname') {
      setNickname(value);
    }
  };
  const signUp = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 회원가입 성공시
        updateProfile(userCredential.user, { displayName: nickname });
        alert('회원가입성공 다시 로그인하세요.');
        window.location = '/auth';
      })
      .catch((error) => {
        // 회원가입 실패시
        console.error(error);
      });
  };

  return (
    <StContainer>
      <StSignUpWrapper>
        <StSignUpLeft>
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
          <img src=""></img>
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
