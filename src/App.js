import { useEffect, useState } from "react";
import { FormControl, Input, IconButton } from "@mui/material";
import "./App.css";
import Message from "./components/Message";
import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        db.collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        message: doc.data(),
                    }))
                );
            });
    }, []);

    useEffect(() => {
        setUsername(prompt("Please enter your name"));
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        db.collection("messages").add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

    return (
        <div className="App">
            <img src="https://scontent-sin6-4.xx.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=mFFa68mFMLEAX8TT6EU&_nc_ht=scontent-sin6-4.xx&oh=00_AfCN-TNlgznqUG106i5A00sNnJP8JcLOXKVWcYV3tI_1oA&oe=644066BD" />
            <h1>Hello World {username}</h1>
            <form className="app__form">
                <FormControl className="app__formControl">
                    <Input
                        className="app__input"
                        placeholder="Enter a message..."
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <IconButton
                        className="app__iconButton"
                        disabled={!input}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={sendMessage}
                    >
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </form>
            <FlipMove>
                {messages.map(({ id, message }) => (
                    <Message key={id} username={username} message={message} />
                ))}
            </FlipMove>
        </div>
    );
}

export default App;
