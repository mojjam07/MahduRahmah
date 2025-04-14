import React from 'react';
import '../styles/Blog.css';

function Blog() {
  return (
    <div className="blog-container" data-testid="blog-page">
      <h1>Mahdu Rahmah Blog</h1>
      <div className="blog-content">
        <p>Welcome to our blog. Check back soon for updates and articles!</p>
      </div>
    </div>
  );
}

export default Blog;
