import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { useParams } from 'react-router-dom';

function Main() {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const { category } = useParams();

  // data get (가져오기)
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    };
    fetchData();
  }, []);

  // data get (추가하기)
  const hanbleAddPost = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: 'test',
      content: content
    };
    if (content <= 0) {
      alert('내용을 입력해 주세요💌');
    } else {
      setPosts(() => {
        return [newPost, ...posts];
      });
      setContent('');
      // Firestore에서 'posts' 컬렉션에 대한 참조 생성하기
      const collectionRef = collection(db, 'posts');
      // 'posts' 컬렉션에 newPost 문서를 추가합니다.
      await addDoc(collectionRef, newPost);
    }
  };

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  return (
    <StContainer>
      <form onSubmit={(event) => hanbleAddPost(event)}>
        <input
          type="text"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          placeholder="어떤 이야기를 나누고 싶나요?"
        />
        <button type="submit">추가</button>
      </form>
      <StPostBox>
        <Post />
        <Post />
        <Post />
      </StPostBox>
    </StContainer>
  );
}

export default Main;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  border: 2px solid black;
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
