import React, { useState } from 'react';
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
      } catch (error) {
        console.log('error', error);
      }
    }
  };

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
    </>
  );
}

export default Post;

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
