import React from 'react';
import { useEffect, useState } from 'react';

import { Routes, Route} from "react-router-dom";
import { getCall } from './Apicall';
import './App.css';

import Home from './pages/Home';
import UserDetails from './pages/userDetails/userdetails';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const getUserData =  () => {
    return new Promise((resolve, reject) => {
      getCall("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
    })
  };

  const getPostData = () => {
    return new Promise((resolve, reject) => {
      getCall("https://jsonplaceholder.typicode.com/posts")
      .then((res)=>{
        resolve(res);
      })
      .catch((err)=>{
        reject(err);
      })
    })
  }

  useEffect(() => {
    Promise.all([getUserData(), getPostData()]).then((res)=>{
      setUserData(res[0]);
      setPostData(res[1]);
    })
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home data={userData} postData={postData}/>}/>
        <Route path={`/postdetails/:userid`} element={<UserDetails postData={postData} />}/>
      </Routes>
    </div>
  );
}

export default React.memo(App);
