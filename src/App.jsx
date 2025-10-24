import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AppContext } from './AppContext'
import { useState } from 'react'
import Store from './views/main/Store'
import SignIn from './views/registration/SignIn'
import SignUp from './views/registration/SignUp'
import Catalog from './views/catalog/Catalog'
import PageGame from './views/pageGame/PageGame'
import Characteristics from './views/pageGame/Characteristics'
import Profile from './views/profile/Profile'
import Settings from './views/settings/Settings'



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
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Game/:id" element={<PageGame />} />
        <Route path="/Game/:id/Characteristics" element={<Characteristics />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </AppContext.Provider>
   )
}

export default App
