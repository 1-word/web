import {Routes, Route} from 'react-router-dom'
import { PersistGate } from 'zustand-persist'
import '@scss/_style';
import Index from '@/pages/Index';
import Word from '@/pages/word/Word';
import Login from '@/pages/user/SignIn';
import Signup from '@/pages/user/SignUp';
import MyPage from '@/pages/user/MyPage';
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
      <Route path="/mypage" element={<MyPage></MyPage>}/>
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
