import axios from "axios";
import {useAuth} from "./Context";
import {useEffect, useState} from "react";
import "./styles.css";

const Home = () => {

    const { user, logout } = useAuth();
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/posts").then((res) => setPosts(res.data));
    }, [posts]);

    const createPost = async () => {
        await axios.post("http://localhost:8080/posts", { content, imageUrl, user });
        setContent("");
        setImageUrl("");
    };

    const deletePost = async (postId) => {
        await axios.delete(`http://localhost:8080/posts/${postId}/delete/${user.id}`);
    };

    const replyToPost = async (postId, replyContent) => {
        if (!user) return;

        await axios.post(`http://localhost:8080/posts/${postId}/reply`, {
            content: replyContent,
            user: { id: user.id } // Ensure the correct user is used
        });
    };

    return (
        <div className="home-container">
            <h2>Welcome, {user?.username}</h2>
            <button onClick={logout} className="logout-button">Logout</button> {/* 👈 Logout Button */}

            <div className="post-form">
                <input type="text" placeholder="Write a post..." value={content} onChange={(e) => setContent(e.target.value)} className="input-field" />
                <input type="text" placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input-field" />
                <button onClick={() => createPost()} className="post-button">Post</button>
            </div>

            <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <p className="post-content">{post.content}</p>
                        {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
                        <p className="post-author">
                            Posted by: {post.user ? post.user.username : "Unknown"}
                        </p>

                        {post.user && post.user.id === user.id && (
                            <button onClick={() => deletePost(post.id)} className="delete-button">
                                Delete
                            </button>
                        )}
                        <div className="replies">
                            {post.replies.map((reply) => (
                                <p key={reply.id} className="reply">{reply.content} - {reply.user.username}</p>
                            ))}
                            <input type="text" placeholder="Reply..." className="input-field reply-input" onKeyDown={(e) => e.key === "Enter" && replyToPost(post.id, e.target.value)} />
                        </div>

                    </div>

                ))}
            </div>
        </div>
    );
};
export default Home;