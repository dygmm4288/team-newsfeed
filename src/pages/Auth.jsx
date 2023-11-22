import React, { useState } from 'react';
import { useAuth } from '../contexts/auth.context';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const { signInWithEmail } = useAuth();

  return (
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
  );
}
