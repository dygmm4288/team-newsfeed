import React from 'react';
import { usePost } from '../../contexts/post.context';
function Post() {
  const { posts } = usePost();

  return (
    <>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
}
export default Post;
