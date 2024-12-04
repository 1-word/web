import {Routes, Route} from 'react-router-dom'
import { PersistGate } from 'zustand-persist'
import '@scss/_style';
import Index from '@/pages/Index';
import Word from '@/pages/word/Word';
import Login from '@/pages/user/SignIn';
import Signup from '@/pages/user/SignUp';
import SignupComplete from '@/pages/user/SignUpComplete';
import SetPw from '@/pages/user/SetPw';
import AuthNumComp from '@/pages/user/AuthNumComplete';
import MyPage from '@/pages/user/MyPage';
import Modals from './components/Modals';
import OAuth from './pages/oauth/OAuth';
import DailySentence from '@/pages/dailySentence/DailySentence';
import VocaBook from './pages/word/VocaBook';


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
      <Route path="/signup-comp" element={<SignupComplete></SignupComplete>}/>
			<Route path="/setPw" element={<SetPw></SetPw>}/>
			<Route path="/authcomplete" element={<AuthNumComp></AuthNumComp>}/>
      <Route path="/mypage" element={<MyPage></MyPage>}/>
      <Route path="/oauth/callback" element={<OAuth></OAuth>}/>
      <Route path="/daily-sentence/main" element={<DailySentence></DailySentence>}/>
      <Route path="/vocabook" element={<VocaBook></VocaBook>}/>
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
