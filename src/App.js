import React, { useState } from 'react';
import './App.css';
import { sendHtmlMail ,sendTextMail, createTemplate } from "./simpleEmail"

const App = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  
  const submitTemplate =  async (e) => {
    e.preventDefault()
    await createTemplate()
  }
  
  const submitData = async (e) => {
    e.preventDefault()
    await sendTextMail(email, name, message);
    await sendHtmlMail(email, name, message);
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
        <div className='app-buttons-wrapper'>
          <button className='first-btn' onClick={(e) => submitData(e)}>Submit</button>
          <button onClick={(e) => submitTemplate(e)}>Create template</button>
        </div>
      </form>
    </div>
  );
}
export default App;