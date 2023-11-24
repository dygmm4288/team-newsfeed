import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth.context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


export default function Auth() {
  //이메일, 비밀번호
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo, signInWithEmail, signInWithGithub, signOutUser } = useAuth();


  const signIn = async(event) =>{
    event.preventDefault();
    try{
      //로그인 성공 시 
      const userCredential  = await signInWithEmailAndPassword(auth,email,password);
      console.log(userCredential );
      window.location = '/';
    }catch(error){
      //로그인실패시
      console.log(error)
      alert("로그인실패");
      window.location = '/';

    }
  }
  return (
    <>
    <StContainer>
        <StSignUpWrapper>
            <StSignUpLeft>
            <img src=''></img>
            </StSignUpLeft>
            <StSignUpRight>
              <Logo>
                <p>BeatBrdge</p>
              </Logo>
              <Form>
                <Input>
                Email : <input type='email' value={email} name='email' onChange={(e) => setEmail(e.target.value)} />
                PassWord : <input type='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)} />
                </Input>
              </Form>
              <BtnWrapper>
              <button onClick={signIn}>Login</button>
                </BtnWrapper>
              <Link to='/signup'><p>회원가입</p></Link>
              <Link to=''><p>비밀번호찾기</p></Link>
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
`
const StSignUpRight = styled.div`
  width: 400px;
  height: 300px;
  border: 1px solid black;
`
const Logo = styled.div`
    width: 400px;
    height: 80px;
    border: 1px solid black;
    & p{  
      font-size: larger;
      text-align: center;
    }
`
const Form = styled.div`
    height: 150px;
    border: 1px solid black;
    align-items: center;
    text-align: center;
    justify-content: center;
    position: relative;
`
const Input = styled.form`
    position: absolute;
    top : 50%;
    left : 50%;
    transform: translate(-50%,-50%);
`
const BtnWrapper = styled.div `
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & button {
    background-color: black;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`