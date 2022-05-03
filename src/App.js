
import React, { useState } from 'react';
import './App.css';
import { sendMail } from "./simpleEmail"

const App = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  
  
  const submitData = async () => {
    await sendMail(email, name, message);
  }
  return (
    <div className="app">
      <h2>Amazon SES</h2>
      <form>
        <div className='app-input-wrapper'>
          <label for="name">Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='app-input-wrapper'>
          <label for="email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='app-input-wrapper'>
          <label for="message">Message: </label>
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button onClick={() => submitData()}>Submit</button>
      </form>
    </div>
  );
}
export default App;