// 이건 어떤 컴포넌트 일까....?
// Post쪽 수정 사항 있음

// import React from 'react';
// import styled from 'styled-components';

// export default function PostBottom({
//   isEditing,
//   editedContent,
//   setEditedContent,
//   handleToggleEditMode,
//   handleDeletePost,
//   handleUpdatePost,
//   post
// }) {
//   return (
//     <StPostBottom>
//       {isEditing ? (
//         <>
//           <textarea
//             value={editedContent}
//             onChange={(e) => {
//               setEditedContent(e.target.value);
//             }}
//           ></textarea>
//           <div>
//             <button
//               onClick={() => {
//                 handleUpdatePost();
//                 handleToggleEditMode();
//               }}
//             >
//               수정 완료
//             </button>
//             <button
//               onClick={() => {
//                 setEditedContent(post.content);
//                 handleToggleEditMode();
//               }}
//             >
//               취소
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <h1>{post.title}</h1>
//           <p>
//             {post.content.split('\n').map((line) => {
//               return (
//                 <>
//                   {line}
//                   <br />
//                 </>
//               );
//             })}
//           </p>
//           <StButtonContainer>
//             <button
//               onClick={() => {
//                 handleToggleEditMode();
//               }}
//             >
//               수정
//             </button>
//             <button
//               onClick={() => {
//                 handleDeletePost();
//               }}
//             >
//               삭제
//             </button>
//           </StButtonContainer>
//         </>
//       )}
//     </StPostBottom>
//   );
// }

// const StPostBottom = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   height: 80%;
//   padding: 15px;
//   border: 2px solid blue;
//   border-radius: 20px;

//   .title {
//     height: 15%;
//   }
//   p {
//     height: 100%;
//     padding-bottom: 20px;
//   }
// `;
// const StButtonContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   position: absolute;
//   right: 13px;
//   bottom: 13px;
// `;
