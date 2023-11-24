import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebase.config';

const initialState = {
  posts: [],
  createPost: ({ title, content, category }) => {},
  updatePost: ({ postId, data, isEditing }) => {},
  deletePost: ({ postId }) => {}
};

// context 생성
const PostContext = createContext(initialState);
// context에서 제공하는 conext.Provider
// CRUD 로직이나 상태 데이터들을 PostProvider에서 관리를 한다.
const PostProvider = ({ children }) => {
  // posts를 데이터베이스에서 요청을 해야 한다.
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
  }, []);
  const getPost = () => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    getDocs(q)
      .then((querySnapshot) => {
        const fetchedPosts = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() });
        });
        // setPosts((prev) => prev.concat(1));
        setPosts(fetchedPosts);
      })
      .catch((e) => {
        console.error('An Error occurred while fetching posts');
        console.error(e);
      });
    // console.log(setPosts((prev) => prev.concat(1)));
  };

  // 밑에 들어가는 로직은 똑같은 입력이 주어지면 똑같은 출력(로직을 수행할 수 있어야 한다)을 할 수 있어야 한다.
  // C
  const createPost = async ({ title, content, category, userInfo }) => {
    // db에 document를 생성해서 추가를 해야한다.
    const newPost = {
      title,
      content,
      createdAt: new Date().toLocaleString(),
      category,
      userInfo
    };
    console.log(newPost);
    //Firestore에서 'posts'컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, 'posts');
    // 'posts' 컬렉션에 newPost 문서를 추가합니다.
    try {
      addDoc(collectionRef, newPost).then((res) => {
        console.log('add success');
        getPost();
      });
    } catch (error) {
      console.error(error);
      console.log(newPost);
    }
  };
  // U
  const updatePost = ({ postId, data }) => {
    const postRef = doc(db, 'posts', postId);
    console.log({ data });
    updateDoc(postRef, data)
      .then((res) => {
        console.log('update success');
        getPost();
      })
      .catch((e) => {
        console.error('An Error occurred while updating posts');
        console.error(e);
      });
  };
  // D
  const deletePost = ({ postId }) => {
    const postRef = doc(db, 'posts', postId);
    deleteDoc(postRef)
      .then((res) => {
        console.log('delete success');
        getPost();
      })
      .catch((e) => {
        console.error('An Error occurred while deleting posts');
        console.error(e);
      });
  };

  const value = { posts, createPost, updatePost, deletePost };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
// useContext(context)
// 이렇게 하는 이유
export const usePost = () => {
  return useContext(PostContext);
};

export default PostProvider;
