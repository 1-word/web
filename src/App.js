import './App.css';
import WordPaper from './wordPaper/wordPaper';
import Login from './login/login';
import Signup from './login/signup';
import {Routes, Route} from 'react-router-dom'
import ModalPortal from './util/ModalPortal';
import Alert from './wordPaper/Component/Alert/alert';
import Add from './wordPaper/Component/Add/add';
import Store from './stores/store';
import { useEffect } from 'react';
import { PersistGate } from 'zustand-persist'
import Popup from './wordPaper/Component/popup';


function App() {

  //const {alert, modal, setModal} = Store(state=>state)

  // useEffect(() => {
  // }, [alert])

  function Router(){
    return (
    <Routes>
      <Route path="/" element={<Login></Login>}/>
      <Route path="/word" element={<WordPaper></WordPaper>}/>   
      <Route path="/signup" element={<Signup></Signup>}/>
    </Routes> 
    );
  }
  return (<PersistGate>
            <div>
              <Router/>
              <Popup></Popup>
            </div>
        </PersistGate>
  );
}

export default App;
