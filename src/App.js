import './App.css';
import WordPaper from './wordPaper/wordPaper';
import Login from './login/login';
import {Routes, Route} from 'react-router-dom'
import ModalPortal from './util/ModalPortal';
import Alert from './wordPaper/Component/Alert/alert';
import Add from './wordPaper/Component/Add/add';
import Store from './stores/store';
import { useEffect } from 'react';
import { PersistGate } from 'zustand-persist'

function App() {

  const {alert, modal, setModal} = Store(state=>state)

  useEffect(() => {
  }, [alert])

  function Router(){
    return (
    <Routes>
      <Route path="/" element={<Login></Login>}/>
      <Route path="/word" element={<WordPaper></WordPaper>}/>   
      <Route path="/join" element={<Login></Login>}/>
    </Routes> 
    );
  }
  return (<PersistGate>
            <div>
              <Router/>
              {alert.show && <ModalPortal id="alert">
                <Alert type={alert.type} message={alert.message}></Alert>
              </ModalPortal>}
              {modal && <ModalPortal id="modal">
                <Add closePopup={() => setModal(false)}></Add>
              </ModalPortal>}
            </div>
        </PersistGate>
  );
}

export default App;
