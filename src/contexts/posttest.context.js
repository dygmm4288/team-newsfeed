//전역관리 context
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebase.config';

// 초기 값
const initialState = {
  //데이터 담아주는 배열
  posts: [],
  //이 함수들은 각각 해당되는 인자들을 받아와서 사용함
  createPost: ({ title, content, category, userInfo }) => {},
  updatePost: ({ postId, data }) => {},
  deletePost: ({ postId }) => {}
};

//context 생성
const PostContext = createContext(initialState);

//자식 컴포넌트에 값을 뿌려주기 위해 provider 사용
//context.Provider로 하위 컴포넌트들을 감싸줘야 데이터 제공 가능
//CRUD로직이나 상태 데이터들을 PostProvider에서 관리
const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  // 최초 1회 실행될때 firebase 데이터 가져오기
  useEffect(() => {
    // 메인 로직 함수로 넣어주기
    getPost();
  }, []);
  const getPost = () => {
    //getDocs하면 firebase 데이터문서 가져올 수 있음
    //db에서 posts라는 이름을 가진 collection을 가져옴
    //firestore은 데이터를 객체의 형태로 저장
    getDocs(collection(db, 'posts'))
      //데이터베이스 쿼리를 실행해서 객체로 반환
      .then((QuerySnapshot) => {
        //빈 배열에 담기 위해 생성
        const fetchedPosts = [];
        //querysnapshot은 반복가능한 객체
        QuerySnapshot.forEach((doc) => {
          //문서id와 문서data를 넣기
          fetchedPosts.push({ id: doc.id, ...doc.data() });
        });
        //그 값들을 posts안에 보관하기
        setPosts(fetchedPosts);
      })
      .catch((e) => {
        //에러로 then이 실행안되면 해당 문구 출력
        console.error('An Error occured while fetching posts');
        console.error(e);
      });
  };
  //post 만드는 함수 (여기서 선언하면 다른 컴포넌트에서 사용가능)
  const createPost = ({ title, content, category, userInfo }) => {
    const newPost = {
      //실제 사용하는 컴포넌트에서 title,content,category,userInfo값을 받아와야한다
      //역으로 자신컴포넌트에서 받은 값을 활용해서 create해준다는 의미
      title,
      content,
      createAt: new Date().toLocaleString(),
      category,
      userInfo
    };
    //firestore에도 저장한 데이터 넘겨주기
    //저장하고 다시 받아와야 ui에서도 바뀐 값 적용됨
    const collectionRef = collection(db, 'posts');
    //doc에 저장
    addDoc(collectionRef, newPost)
      .then((res) => {
        console.log('add success');
        //다시 저장한거 꺼내와서 리랜더링
        getPost();
      })
      //값 못 불러 왔을 경우 에러창나타내기
      .catch((e) => {
        console.error('An Error occurred while adding posts');
        console.error(e);
      });
  };
  //수정하고난 post를 나타내기 위한 전역 함수
  //해당 post를 가리키는 문서 id와 data값 변경을 위한 data가 필요함
  const updatePost = ({ postId, data }) => {
    //db의 posts 컬렉션 안에 문서 id인 postId를 postRef에 선언
    const postRef = doc(db, 'posts', postId);
    //해당 문서의 데이터를 update
    updateDoc(postRef, data)
      .then(() => {
        //변경된 데이터를 다시 가져옴
        getPost();
      })
      .catch((e) => {
        console.error('An Error occurred while updating posts');
        console.error(e);
      });
  };
  //삭제를 위한 함수, 해당 문서를 찾기위한 id가 필요
  const deletePost = ({ postId }) => {
    //posts컬렉션안의 문서 id를 참조하는 변수 postRef
    const postRef = doc(db, 'posts', postId);
    deleteDoc(postRef)
      .then(() => {
        //삭제하고 난 데이터를 불러옴
        getPost();
      })
      .catch((e) => {
        console.error('An Error occured while deleting posts');
        console.error(e);
      });
  };
  //실제 자식 컴포넌트에서 사용할 값들만 value로 묶어줌
  const value = { posts, createPost, updatePost, deletePost };

  //Provider를 통해 자식컴포넌트는 value 해당된 값을 사용할 수 있음
  //children은 자식컴포넌트로 정보를 전달하는 방법
  //즉 부모컴포넌트에서 자식컴포넌트를 어떤식으로 유동성있게 구성할건지를 정하는 layout이라고 생각하면 됨
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
