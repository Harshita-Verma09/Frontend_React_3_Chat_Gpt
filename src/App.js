import './App.css';
import gptLogo from './assests/chatgpt.svg';
import addBtn from './assests/add-30.png';
import msgIcon from './assests/message.svg';
import home from './assests/home.svg';
import saved from './assests/bookmark.svg';
import rocket from './assests/rocket.svg';
import sendBtn from './assests/send.svg';
import userIcon from './assests/user-icon.png';
import gptImgLogo from './assests/chatgptLogo.svg';
import { getGroqChatCompletion } from './openai';
import { useState, useRef, useEffect } from 'react';

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am Chat GPT",
      isBot: true,
    }
  ]);
  useEffect(() => {
    // Scroll to the bottom of the messages when a new message is added
    msgEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    try {
      const text = input;
      setInput('');
      setMessages((prevMessages) => [   // Add the user message
        ...prevMessages,
        { text, isBot: false }
      ]);
      const res = await getGroqChatCompletion(text); // Fetch bot response

      // Add bot response (ensuring res.choices[0].message is defined)
      const botText = res?.choices?.[0]?.message?.content || "Error: No response";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botText, isBot: true }
      ]);

    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }
  };


  const handleEnter = async (e) => {
    if (e.key === 'Enter' && input.trim() !== '') await handleSend();

  }

  const handleQuery = async (e) => {
    try {
      const text = e.target.value;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, isBot: false }
      ]);
      const res = await getGroqChatCompletion(text);
      const botText = res?.choices?.[0]?.message?.content || "Error: No response";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botText, isBot: true }
      ]);

    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }
  }
  return (
    <div className='App'>
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} alt='Logo' className='logo' />
            <span className='brand'>ChatGPT</span>
          </div>
          <button className='midBtn' onClick={() => { window.location.reload() }}>
            <img src={addBtn} alt='New Chat' className='addBtn' />New Chat
          </button>
          <div className='upperSideBottom'>
            <button className='query' onClick={handleQuery} value={"What is Programming?  "}>
              <img src={msgIcon} alt='Query' />What is Programming?
            </button>
            <button className='query' onClick={handleQuery} value={"How to use an API? "}>
              <img src={msgIcon} alt='Query' />How to use an API?
            </button>
          </div>
        </div>

        <div className='lowerSide'>
          <div className='listItems'>
            <img src={home} alt='Home' className='listItemsImg' />Home
          </div>
          <div className='listItems'>
            <img src={saved} alt='Saved' className='listItemsImg' />Saved
          </div>
          <div className='listItems'>
            <img src={rocket} alt='Upgrade' className='listItemsImg' />Upgrade to Pro
          </div>
        </div>
      </div>

      <div className='main'>
        <div className='chats'>
          {messages.map((message, i) =>
            <div
              key={i}
              className={message.isBot ? "chat bot" : "chat"}
            >
              <img
                className='chatImg'
                src={message.isBot ? gptImgLogo : userIcon}
                alt='gptImgLogo'
              />
              <p className='txt'>{message.text}</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input
              type='text'
              name='prompt'
              placeholder='Send a message'
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => { setInput(e.target.value) }}
            />
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt='Send' className='sendbtn1' />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 Version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;


