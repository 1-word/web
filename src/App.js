import {Routes, Route} from 'react-router-dom'
import { PersistGate } from 'zustand-persist'
import '@scss/_style';
import Index from '@/pages/index';
import Word from '@/pages/word/Word';
import Login from '@/pages/login/Login';
import Signup from '@/pages/login/Signup';
import Modals from './components/Modals';


function App() {

  //const {alert, modal, setModal} = Store(state=>state)

  // useEffect(() => {
  // }, [alert])

  function Router(){
    return (
    <Routes>
      <Route path="/" element={<Index></Index>}/>
      <Route path="/signin" element={<Login></Login>}/>
      <Route path="/word" element={<Word></Word>}/>   
      <Route path="/signup" element={<Signup></Signup>}/>
    </Routes> 
    );
  }
  return (<PersistGate>
            <div>
              <Router/>
              <Modals></Modals>
            </div>
        </PersistGate>
  );
}

export default App;
