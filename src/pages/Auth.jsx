import React, { useState } from 'react';
import { useAuth } from '../contexts/auth.context';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const { userInfo, signInWithEmail, signInWithGithub, signOutUser } =
    useAuth();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          signInWithEmail(email, pwd);

          setEmail('');
          setPwd('');
        }}
      >
        <label>이메일</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>비밀번호</label>
        <input value={pwd} onChange={(e) => setPwd(e.target.value)} />
        <button type="submit">제출</button>
      </form>

      <div> 현재 유저 정보 </div>
      <ul>
        <li>이메일 : {userInfo?.email}</li>
        <li>닉네임 : {userInfo?.nickname}</li>
        <li>photoURL : {userInfo?.profileImgUrl}</li>
      </ul>
      <button onClick={signOutUser}>로그 아웃 하기</button>
      <button onClick={signInWithGithub}>깃허브 로그인 하기</button>
    </>
  );
}
