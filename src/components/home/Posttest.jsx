import React from 'react'

function Posttest( {post}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const { deletePost, updatePost } = usePost();

  //그냥 불리언을 반대로 세팅해줌
  const handleToggleEditMode = () => {
    setIsEditing(!isEditing); //와우....
  }
  //삭제시 사용자 재확인하고 진짜 삭제를 원하면 
  //deletePost함수를 이용하여 해당 문서의 id를 찾아 삭제한다
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('정말 삭제?');
    if (comfirmDelete) {
      try {
        await deletePost({postId : post.id})
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const handleUpdatePost = async () => {
    updatePost({postId : post.id, content:editedContent})
  }
  return (
    <div>
      <div>
        {post.isEditing ? (
          <textarea 
          onChange={(e)=> {
            setEditedContent(e.target.value);
          }}>
            <div>
              <button onClick={()=> handleUpdatePost()}>수정 완료</button>
              <button onClick={()=> handleToggleEditMode()}>취소</button>
            </div>
          </textarea>
        )}
      </div>
    </div>
  )
}

export default Posttest {post}