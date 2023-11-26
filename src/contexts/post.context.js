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

  const executeFireStore = async (
    taskName,
    asyncApi,
    { asyncTask, finallyTask }
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await asyncApi();
      if (asyncTask) await asyncTask(result);
    } catch (err) {
      setError(err);
      console.error(`An Error occurred while ${taskName}`);
    } finally {
      setIsLoading(false);
      if (finallyTask) await finallyTask();
    }
  };

  const getPost = () =>
    executeFireStore(
      'fetching posts',
      () => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        return getDocs(q);
      },

      {
        asyncTask: (querySnapshot) => {
          const fetchedPostsWithId = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setPosts(fetchedPostsWithId);
        }
      }
    );

  // 밑에 들어가는 로직은 똑같은 입력이 주어지면 똑같은 출력(로직을 수행할 수 있어야 한다)을 할 수 있어야 한다.
  // C
  const createPost = async ({ title, content, category, userInfo }) =>
    executeFireStore(
      'creating posts',
      () => {
        const newPost = {
          title,
          content,
          createdAt: new Date().toLocaleString(),
          category,
          userInfo
        };
        const collectionRef = collection(db, 'posts');
        return addDoc(collectionRef, newPost);
      },
      {
        finallyTask: getPost
      }
    );
  // U
  const updatePost = ({ postId, data }) =>
    executeFireStore(
      'updating posts',
      () => {
        const postRef = doc(db, 'posts', postId);
        return updateDoc(postRef, data);
      },
      {
        finallyTask: getPost
      }
    );
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
  const deletePost = ({ postId }) =>
    executeFireStore(
      'deleting posts',
      () => {
        const postRef = doc(db, 'posts', postId);
        return deleteDoc(postRef);
      },
      {
        finallyTask: getPost
      }
    );
  /* const deletePost = ({ postId }) => {
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
  }; */

  const value = { posts, createPost, updatePost, deletePost, updatePosts };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
export const usePost = () => {
  return useContext(PostContext);
};

export default PostProvider;
