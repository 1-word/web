import {Routes, Route} from 'react-router-dom'
import { PersistGate } from 'zustand-persist'
import '@scss/_style';
import Word from '@/pages/word/Word';
import Login from '@/pages/login/Login';
import Signup from '@/pages/login/Signup';
import Popup from '@components/modal/Popup';


function App() {

  //const {alert, modal, setModal} = Store(state=>state)

  // useEffect(() => {
  // }, [alert])

  function Router(){
    return (
    <Routes>
      <Route path="/" element={<Login></Login>}/>
      <Route path="/word" element={<Word></Word>}/>   
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
