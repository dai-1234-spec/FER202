import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.json();
      })
      .then((data) => setPost(data))
      .catch((error) => {
        console.error('Error loading post:', error);
        setPost(null);
      });
  }, [id]);
  if (!post) {
    return <h2>Post not found</h2>;
  }
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
export default PostDetail;