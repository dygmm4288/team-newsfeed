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
  updatePost: ({ postId, data }) => {},
  deletePost: ({ postId }) => {},
  updatePosts: ({ userInfo }) => Promise.all([])
};

// context 생성
const PostContext = createContext(initialState);
// context에서 제공하는 conext.Provider
// CRUD 로직이나 상태 데이터들을 PostProvider에서 관리를 한다.
const PostProvider = ({ children }) => {
  // posts를 데이터베이스에서 요청을 해야 한다.
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPost();
  }, []);

  const executeFireStore = async (asyncApi, asyncTask, errorMsg) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await asyncApi();
      if (result) await asyncTask(result);
    } catch (err) {
      setError(err);
      console.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const getPost = () => {
    executeFireStore(
      () => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        return getDocs(q);
      },
      (querySnapshot) => {
        const fetchedPostsWithId = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(fetchedPostsWithId);
      },
      'An Error occurred while fetching posts'
    );
  };

  /* const getPost = async () => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    return getDocs(q)
      .then((querySnapshot) => {
        const fetchedPostsWithId = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(fetchedPostsWithId);
      })
      .catch((e) => {
        console.error('An Error occurred while fetching posts');
        console.error(e);
      });
  }; */

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
    // Fire store에서 'posts'컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, 'posts');
    // 'posts' 컬렉션에 newPost 문서를 추가합니다.
    try {
      await addDoc(collectionRef, newPost);
      console.log('Success Add');
    } catch (error) {
      console.error(error);
      console.error('An Error occurred while creating posts');
    } finally {
      await getPost();
    }
  };
  // U
  const updatePost = ({ postId, data }) => {
    const postRef = doc(db, 'posts', postId);
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
  const updatePosts = async ({ userInfo }) => {
    return Promise.all([
      posts
        .filter((post) => post.userInfo.email === userInfo.email)
        .map((post) => {
          return updatePost({ postId: post.id, data: { userInfo: userInfo } });
        })
    ]).catch((e) => {
      console.error('An occurred while updating posts');
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

  const value = { posts, createPost, updatePost, deletePost, updatePosts };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
export const usePost = () => {
  return useContext(PostContext);
};

export default PostProvider;
