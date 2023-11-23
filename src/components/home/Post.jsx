import React, { useState } from 'react';
<<<<<<< HEAD
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import styled from 'styled-components';
import { db } from '../../firebase/firebase.config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getPosts } from '../../firebase/firebase.config';

function Post({ posts, setPosts }) {
  const [editedContent, setEditedContent] = useState('');

  const editPost = (postId, content) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, isEditing: true } : post
    );
    setPosts(updatedPosts);
    setEditedContent(content);
  };

  const saveEditedPost = async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        content: editedContent
      });
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
      setEditedContent('');
    } catch (error) {
      console.log(error);
    }
  };

  const cancleEdit = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, isEditing: false } : post
    );
    setPosts(updatedPosts);
    setEditedContent('');
  };

  const deletePost = async (postId) => {
    console.log('postId', postId);
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    console.log(confirmDelete);

    if (confirmDelete) {
      try {
        // await db.collection('posts').doc(postId).delete();
        const postRef = doc(db, 'posts', postId);
        await deleteDoc(postRef);
        const updatedPost = posts.filter((post) => post.id !== postId);
        console.log('updatedPost', updatedPost);
        setPosts(updatedPost);
=======
import styled from 'styled-components';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
import { usePost } from '../../contexts/post.context';

export default function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const { deletePost, updatePost } = usePost();

  const handleToggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deletePost({ postId: post.id });
>>>>>>> 03a0b4c6ad04e0d7cbc0c9660122d72941dfb473
      } catch (error) {
        console.log('error', error);
      }
    }
  };
<<<<<<< HEAD

  return (
    <>
      {posts.map((post) => (
        <StPost key={post.id}>
          <StPostTop key={post.id}>
            <img src={ProfilePicture} alt="ProfilePicture" />
            <p>{post.nickname}</p>
            <p>{post.title}</p>
            <p>{post.createdAt}</p>
          </StPostTop>
          <StPostBottom key={post.id}>
            {post.isEditing ? (
              <>
                <textarea
                  value={editedContent}
                  onchange={(e) => setEditedContent(e.target.value)}
                />
                <div>
                  <button onClick={() => saveEditedPost(post.id)}>
                    수정 완료
                  </button>
                  <button onClick={() => cancleEdit(post.id)}>취소</button>
                </div>
              </>
            ) : (
              <>
                <p>{post.content}</p>
                <div>
                  <button onClick={() => editPost(post.id, post.content)}>
                    수정
                  </button>
                  <button onClick={() => deletePost(post.id)}>삭제</button>
                </div>
              </>
            )}
            <div>
              <button onClick={() => editPost(post.id, post.content)}>
                수정
              </button>
              <button onClick={() => deletePost(post.id)}>삭제</button>
            </div>
            <p>{post.content}</p>
          </StPostBottom>
        </StPost>
      ))}
=======

  const handleUpdatePost = async () => {
    updatePost({ postId: post.id, content: editedContent });
  };

  return (
    <>
      <StPost>
        <StPostTop>
          <img src={ProfilePicture} alt="ProfilePicture" />
          <p>{post.nickname}</p>
          <p>{post.title}</p>
          <p>{post.createdAt}</p>
        </StPostTop>
        <StPostBottom>
          {post.isEditing ? (
            <textarea
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            >
              <div>
                <button onClick={() => handleUpdatePost()}>수정 완료</button>
                <button onClick={() => handleToggleEditMode()}>취소</button>
              </div>
            </textarea>
          ) : (
            <>
              <p>{post.content}</p>
              <div>
                <button onClick={() => handleToggleEditMode()}>수정</button>
                <button onClick={() => handleDeletePost()}>삭제</button>
              </div>
            </>
          )}
        </StPostBottom>
      </StPost>
>>>>>>> 03a0b4c6ad04e0d7cbc0c9660122d72941dfb473
    </>
  );
}

const StPost = styled.li`
  width: 500px;
  min-height: 300px;
  border: 2px solid black;
`;
const StPostTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20%;
  padding: 0 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
const StPostBottom = styled.div`
  position: relative;
  height: 80%;
  padding: 15px;
  border: 2px solid blue;
  border-radius: 20px;
  button {
    position: absolute;
    right: 4%;
  }
  p {
    height: 100%;
    padding-bottom: 20px;
  }
`;
