import logo from './logo.svg';
import './App.css';
import WordPaper from './wordPaper/wordPaper';
import WordPaperMobile from './wordPaperMobile/wordPaperMobile';
import Login from './login/login';
import { useMediaQuery } from 'react-responsive';
import { BrowerRouter, Routes, Route} from 'react-router-dom'
import ModalPortal from './util/ModalPortal';
import Alert from './wordPaper/Component/Alert/alert';
import Add from './wordPaper/Component/Add/add';
import Store from './stores/store';
import { useEffect } from 'react';
import { PersistGate } from 'zustand-persist'

function App() {

  const {alert, modal, setAlert, setModal} = Store(state=>state)

  useEffect(() => {
  }, [alert])

  const isMobile = useMediaQuery({query: "(max-width: 1080px)",});
  const isDesktop = useMediaQuery({query: "(min-width: 1081px)",});
  return (<PersistGate>
            <div>
              <Routes>
                <Route path="/word" element={
                  <div>{isMobile 
                    ? <WordPaperMobile></WordPaperMobile> 
                    : <WordPaper></WordPaper>}
                </div>}/>
                <Route path="/" element={<Login></Login>}/>
              </Routes>
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
