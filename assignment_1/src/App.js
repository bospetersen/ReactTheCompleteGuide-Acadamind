import React, {useState} from 'react';
import UserOutput from './components/UserOutput';
import UserInput from './components/UserInput'
import './App.css';

function App() {
const [userName, setUserName] = useState('StayInSchool');

const addUserNameHandler = () => {
  console.log("addUserNameHandler just fired")
}

  return (
    <div className="App">
      <UserInput  onHandler={addUserNameHandler} />
      <UserOutput username="ReactCool" />
      <UserOutput  username={userName} onHandler={addUserNameHandler} />
    </div>
  );
}

export default App;
