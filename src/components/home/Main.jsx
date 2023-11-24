import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { useAuth } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Main() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('발라드');

  const { userInfo } = useAuth();
  const titleInputRef = useRef();
  const contentInputRef = useRef();
  const categorySelecte = useRef();
  const sunmitBtn = useRef();

  const navigate = useNavigate();

  // data get (가져오기)
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push(doc.data());
      });
      setPosts(fetchedPosts);
    };
    fetchData();
  }, []);

  // data get (추가하기)
  const hanbleAddPost = async (event) => {
    event.preventDefault();

    if (title.trim() && content.trim()) {
      const newPost = {
        // userId: 'test', 게시물 고유 아이디 - 필요한 이유?? 삭제 수정하려고
        // nickname : 회원가입 후 작성한 닉네임 값
        //profileImg : 회원가입시 등록한 이미지 값
        title: title,
        content: content,
        createdAt: new Date().toLocaleString(),
        category: selectedCategory
        //updatedAt은 수정쪽에서 건들기
        //likeCount,review는 추가기능
      };

      setPosts([newPost, ...posts]);

      //Firestore에서 'posts'컬렉션에 대한 참조 생성하기
      const collectionRef = collection(db, 'posts');
      // 'posts' 컬렉션에 newPost 문서를 추가합니다.
      await addDoc(collectionRef, newPost);

      setTitle('');
      setContent('');
    } else {
      alert('제목과 내용 모두 입력해주세요💌');
    }
  };

  // 주소에서 category 가져오기
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  // 로그인 X alert
  const handleFocus = () => {
    if (userInfo === null) {
      if (
        window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')
      ) {
        navigate('/auth');
      } else {
        titleInputRef.current.blur();
        contentInputRef.current.blur();
        categorySelecte.current.blur();
        sunmitBtn.current.blur();
      }
    }
  };

  return (
    //flex로 input 세로 배치 할 예정
    <StContainer>
      <form onSubmit={(event) => hanbleAddPost(event)} onFocus={handleFocus}>
        <input
          ref={titleInputRef}
          type="text"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 15) {
              setTitle(e.target.value);
            } else {
              alert('제목이 너무 깁니다!');
            }
          }}
          placeholder="제목을 입력해주세요"
        ></input>
        <input
          ref={contentInputRef}
          type="textarea"
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setContent(e.target.value);
            } else {
              alert('내용이 너무 깁니다!');
            }
          }}
          placeholder="어떤 이야기를 나누고 싶나요?"
        />
        {category === null ? (
          <select
            ref={categorySelecte}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value={'발라드'}>발라드</option>
            <option value={'힙합'}>힙합</option>
            <option value={'R&B'}>R&B</option>
            <option value={'락'}>락</option>
            <option value={'댄스'}>댄스</option>
            <option value={'연예인'}>연예인</option>
          </select>
        ) : (
          <p>{category}</p>
        )}
        <button ref={sunmitBtn} type="submit">
          추가
        </button>
      </form>
      <StPostBox>
        <Post posts={posts} category={category} userInfo={userInfo} />
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
  margin: 40px 0;

  form {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
