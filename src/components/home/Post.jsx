import React from 'react';
import ProfilePicture from '../../assets/Layout/Test-ProfilePicture.png';
// import styled from 'styled-components';

function Post({ title, content, posts }) {
  const changedPost = () => {};
  const deletePost = () => {};
  return (
    // <StPost>
    //   <StPostTop>
    <div>
      {posts.map((post) => (
        <div>
          <img src={ProfilePicture} alt="ProfilePicture" />
          {/* <p>{post.nickname}</p> */}
          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>
      ))}
      {/* <img src={ProfilePicture} alt="ProfilePicture" />
        <p>아이디</p> */}
      {/* </StPostTop> */}
      {/*  <StPostBottom> */}
      <button onClick={() => changedPost}>수정</button>
      <button onClick={() => deletePost}>삭제</button>
      <p>내용</p>
      {/* </StPostBottom>
     </StPost> */}
    </div>
  );
}

export default Post;

// const StPost = styled.li`
//   width: 350px;
//   min-height: 250px;
//   border: 2px solid black;
// `;

// const StPostTop = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   height: 20%;
//   padding: 0 10px;

//   img {
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//   }
// `;

// const StPostBottom = styled.div`
//   position: relative;
//   height: 80%;
//   padding: 15px;
//   border: 2px solid blue;
//   border-radius: 20px;

//   button {
//     position: absolute;
//     right: 4%;
//   }

//   p {
//     height: 100%;
//     padding-bottom: 20px;
//   }
// `;
