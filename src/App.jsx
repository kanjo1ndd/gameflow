import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AppContext } from './AppContext'
import { useState } from 'react'
import Store from './views/main/Store'


function App() {

  const [token, setToken] = useState(null);

  // добавил подключение к бекенду. порт не забудьте поменять только =)
  const request = (url, conf) => new Promise((resolve, reject) => {
    if(url.startsWith("/")){
        url = "https://localhost:7202" + url; 
    }
    if(token != null){
      if(typeof conf == 'undefined'){
        conf = {};
      }
      if(typeof conf['headers'] == 'undefined'){
        conf['headers'] = {};
      }
      if(typeof conf['headers']['Authorization'] == 'undefined') {
        conf['headers']['Authorization'] = 'Bearer ' + token;
      }
    }
    fetch(url, conf)
    .then(r => r.json())
    .then(j => {
        if(j.status.isOk) {
            resolve(j.data);
        }
        else {
            reject(j);
        }
    });
  });

  return (
      <AppContext.Provider value={{request, token, setToken}}>
      <Routes>
        <Route path="/" element={<Store />} />
      </Routes>
    </AppContext.Provider>
   )
}

export default App
