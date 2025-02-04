import {useState} from "react";
import {useAuth} from "./Context";
import "./styles.css";
const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};
export default Login;