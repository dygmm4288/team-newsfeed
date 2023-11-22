import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <>
    <div>Home입니다.</div>
    <Link to='/signup'>
      <button>회원가입</button>
    </Link>
    </>
  
   
  );
        
}
