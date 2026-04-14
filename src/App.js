import { useState, useEffect, useRef} from 'react';
const App = () => {
  const [ value, setValue] = useState('');
  const [ message, setMessage] = useState('');
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [notification, setNotification] = useState(null);
  const bottomRef = useRef(null);
  const openLogin = () => {
  setShowLogin(true);
  setShowSignup(false);
};

const openSignup = () => {
  setShowSignup(true);
  setShowLogin(false);
};

const closeModals = () => {
  setShowLogin(false);
  setShowSignup(false);
};
  const createNewChat = () => {
    setCurrentTitle(null);
    setValue('');
    setMessage(null);
  }
  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  }
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  const getMessages = async () => {
  if (!value) return;

  const userMessage = value;
  setValue("");
  try {
  const response = await fetch("http://localhost:8000/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userMessage,
      history: currentChat.map(chat => ({
        role: chat.role === "ai" ? "model" : "user",
        parts: [{ text: chat.content }]
      }))
    })
  });
   if (!response.ok) {
    throw new Error("Server error");
   }
  const text = await response.text(); //

  const newTitle = currentTitle || userMessage;
  if (!currentTitle) setCurrentTitle(newTitle);

  setPreviousChats(prev => [
    ...prev,
    { title: newTitle, role: "user", content: userMessage },
    { title: newTitle, role: "ai", content: text }
  ]);
} catch(error) {
  console.error("FETCH ERROR:", error);
  setPreviousChats(prev => [
      ...prev,
      { title: currentTitle || "Error", role: "ai", content: "Something went wrong 😢" }
    ]);
  }
};
  console.log(previousChats);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));
  console.log(uniqueTitles);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat, message]);
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);
  return (
    <div className="App">
      <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() =>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <button type='submit' className='login_Btn' onClick={openLogin}>Log in</button>
        <nav>
          <p>Made by Abhi</p>
        </nav>
      </section>
      <section className='main'>
        <div className='top-bar'>
          {!currentTitle && (
            <>
              <h1>Abhigpt</h1>
            </>
          )}
          <button type='submit' id='login-btn' onClick={openLogin}>Log in</button>
          <button type='submit' id='sign-up' onClick={openSignup}>Sign Up for free</button>
        </div>
         <ul className='feed'>
          {!currentTitle && (
            <li>
              <p className="role">system</p>
              <p>Start a new conversation 🚀</p>
            </li>
          )}
          {currentChat.map((chatMessage, index) => (
            <li key={index}>
              <p className='role'>{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
          {message && (
            <li>
              <p className="role">ai</p>
              <p>{message.content || "Typing..."}</p>
            </li>
          )}
          <div ref={bottomRef} />
        </ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <input 
            type='text' 
            id='text'
            disabled={!!message} 
            name='text' 
            placeholder='Ask anything' 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getMessages()}/>
            <div id='submit' onClick={getMessages}>➢</div>
          </div>
          <p className='info'>
            Chatgpt 14 version is free. Free Research preview
          </p>
        </div>
      </section>
      {showLogin && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModals}>X</button>
            <h2>Login</h2>

            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="modal-btn" onClick={() => {
                setNotification("Login successful 🎉");
                closeModals();
              }}>Login</button>

            <p onClick={() => { setShowLogin(false); setShowSignup(true); }}>
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      )}
      {showSignup && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModals}>X</button>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="modal-btn" onClick={() => {
                setNotification("Signup successful 🎉");
                closeModals();
              }}>Create Account</button>

            <p onClick={() => { setShowSignup(false); setShowLogin(true); }}>
              Already have an account? Login
            </p>
          </div>
        </div>
      )}
      {notification && (
        <div className="toast">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;
