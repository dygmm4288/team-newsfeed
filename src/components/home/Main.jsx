import React, { useState } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import Post from './Post';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { v4 as uuidv4 } from 'uuid';
=======
import { usePost } from '../../contexts/post.context';
import Post from './Posts';
>>>>>>> 03a0b4c6ad04e0d7cbc0c9660122d72941dfb473

function Main() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const { category } = useParams();
  const [category, setCategory] = useState('전체보기');
<<<<<<< HEAD

  // data get (가져오기)
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
        console.log(fetchedPosts);
      });
      setPosts(fetchedPosts);
    };
    fetchData();
  }, []);

=======
  const { posts, createPost } = usePost();
  console.log(posts);
>>>>>>> 03a0b4c6ad04e0d7cbc0c9660122d72941dfb473
  // data get (추가하기)
  const handleAddPost = async (event) => {
    event.preventDefault();

    if (title.trim() && content.trim()) {
<<<<<<< HEAD
      const newPost = {
        // nickname : 회원가입 후 작성한 닉네임 값
        //profileImg : 회원가입시 등록한 이미지 값
        // id: uuidv4(),
        title: title,
        content: content,
        createdAt: new Date().toLocaleString(),
        category: category
        //updatedAt은 수정쪽에서 건들기
        //likeCount,review는 추가기능
      };

      setPosts([newPost, ...posts]);

      //Firestore에서 'posts'컬렉션에 대한 참조 생성하기
      const collectionRef = collection(db, 'posts');
      // 'posts' 컬렉션에 newPost 문서를 추가
      await addDoc(collectionRef, newPost);

=======
      createPost({ title, content, category });
>>>>>>> 03a0b4c6ad04e0d7cbc0c9660122d72941dfb473
      setTitle('');
      setContent('');
    } else {
      alert('제목과 내용 모두 입력해주세요💌');
    }
  };
  return (
    <StContainer>
      <form onSubmit={(event) => handleAddPost(event)}>
        <input
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={'발라드'}>발라드</option>
          <option value={'힙합'}>힙합</option>
          <option value={'R&B'}>R&B</option>
          <option value={'락'}>락</option>
          <option value={'댄스'}>댄스</option>
          <option value={'연예인'}>연예인</option>
        </select>
        <button type="submit">추가</button>
      </form>
      <StPostBox>
<<<<<<< HEAD
        <Post
          title={title}
          content={content}
          posts={posts}
          setPosts={setPosts}
        />
=======
        <Post />
>>>>>>> 03a0b4c6ad04e0d7cbc0c9660122d72941dfb473
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
  /* border: 2px solid black; */
`;

const StPostBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
