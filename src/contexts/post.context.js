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
import useModal from '../hooks/useModal';

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
  const [isLoading, runFireStore] = useAsync();
  const { alertModal } = useModal();

  useEffect(() => {
    getPost();
  }, []);

  // 코드 응집도 높이기 방법 1: 바로 그 함수 안에 에러를 집어넣는다

  const getPost = () =>
    runFireStore('fetching posts', {
      asyncAction: () => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        return getDocs(q);
      },
      onSuccess: (querySnapshot) => {
        const fetchedPostsWithId = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(fetchedPostsWithId);
      },
      onError: (error) => {
        alertModal({
          name: '포스트 불러오기 에러',
          content: '포스트를 불러오는 동안 에러가 발생했습니다',
          errorContent: error?.code
        });
      }
    });

  const runFireStoreAndFinallyGetPost = (
    taskName,
    { onSuccess, asyncAction, onError }
  ) =>
    runFireStore(taskName, {
      asyncAction,
      onSuccess,
      onError,
      onFinally: getPost
    });

  const createPost = async ({ title, content, category, userInfo }) =>
    runFireStoreAndFinallyGetPost('creating posts', {
      asyncAction: () => {
        const newPost = {
          title,
          content,
          createdAt: new Date(),
          category,
          userInfo
        };
        const collectionRef = collection(db, 'posts');
        return addDoc(collectionRef, newPost);
      },
      onError: (error) => {
        alertModal({
          name: '포스트 작성하기 에러',
          content: '포스트를 작성하는 동안 에러가 발생했습니다',
          errorContent: error?.code
        });
      }
    });

  const updatePost = ({ postId, data }) =>
    runFireStoreAndFinallyGetPost('updating posts', {
      asyncAction: () => {
        const postRef = doc(db, 'posts', postId);
        return updateDoc(postRef, data);
      },
      onError: (error) => {
        alertModal({
          name: '포스트 업데이트 에러',
          content: '포스트를 업데이트하는 동안 에러가 발생했습니다.',
          errorContent: error?.code
        });
      }
    });

  const updatePosts = async ({ userInfo }) => {
    runFireStore('updating posts', {
      asyncAction: () =>
        Promise.all(
          posts.reduce((asyncTasks, post) => {
            if (post.userInfo.email === userInfo.email) {
              const postRef = doc(db, 'posts', post.id);
              asyncTasks.push(updateDoc(postRef, { userInfo: userInfo }));
            }
            return asyncTasks;
          }, [])
        ),
      onError: (error) => {
        alertModal({
          name: '포스트 업데이트 에러',
          content:
            '사용자의 정보를 변경하면서 업데이트하는 동안 에러가 발생했습니다.',
          errorContent: error?.code
        });
      }
    });
  };

  const deletePost = ({ postId }) =>
    runFireStoreAndFinallyGetPost('deleting posts', {
      asyncAction: () => {
        const postRef = doc(db, 'posts', postId);
        return deleteDoc(postRef);
      },
      onError: (error) => {
        alertModal({
          name: '포스트 삭제 에러',
          content: '포스트를 삭제하는 동안 에러가 발생했습니다.',
          errorContent: error?.code
        });
      }
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
