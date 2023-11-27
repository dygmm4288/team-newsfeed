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
import useAsync from '../hooks/useAsync';

const initialState = {
  posts: [],
  createPost: ({ title, content, category }) => {},
  updatePost: ({ postId, data }) => {},
  deletePost: ({ postId }) => {},
  updatePosts: ({ userInfo }) => Promise.all([])
};

const PostContext = createContext(initialState);
const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, executeFireStore, error] = useAsync();

  useEffect(() => {
    getPost();
  }, []);
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
          console.log(fetchedPostsWithId);
          setPosts(fetchedPostsWithId);
        }
      }
    );

  const executeFireStoreWithGetPost = (taskName, api) =>
    executeFireStore(taskName, api, { finallyTask: getPost });

  const createPost = async ({ title, content, category, userInfo }) =>
    executeFireStoreWithGetPost('creating posts', () => {
      const newPost = {
        title,
        content,
        createdAt: new Date(),
        category,
        userInfo
      };
      const collectionRef = collection(db, 'posts');
      return addDoc(collectionRef, newPost);
    });
  const updatePost = ({ postId, data }) =>
    executeFireStoreWithGetPost('updating posts', () => {
      const postRef = doc(db, 'posts', postId);
      return updateDoc(postRef, data);
    });
  const updatePosts = async ({ userInfo }) => {
    executeFireStore('updating posts', () =>
      Promise.all(
        posts.reduce((acc, post) => {
          if (post.userInfo.email === userInfo.email) {
            const postRef = doc(db, 'posts', post.id);
            acc.push(updateDoc(postRef, { userInfo: userInfo }));
          }
          return acc;
        }, [])
      )
    );
  };

  const deletePost = ({ postId }) =>
    executeFireStoreWithGetPost('deleting posts', () => {
      const postRef = doc(db, 'posts', postId);
      return deleteDoc(postRef);
    });

  const value = {
    posts,
    createPost,
    updatePost,
    deletePost,
    updatePosts,
    isLoading
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
export const usePost = () => {
  return useContext(PostContext);
};

export default PostProvider;
