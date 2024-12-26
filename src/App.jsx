import {Routes, Route} from 'react-router-dom'
import { PersistGate } from 'zustand-persist'
import '@scss/_style';
import Home from '@/pages/Home';
import Word from '@/pages/word/Word';
import Login from '@/pages/user/SignIn';
import Signup from '@/pages/user/SignUp';
import SignupComplete from '@/pages/user/SignUpComplete';
import SetPw from '@/pages/user/SetPw';
import AuthNumComp from '@/pages/user/AuthNumComplete';
import MyPage from '@/pages/user/MyPage';
import Modals from '@/components/Modals';
import OAuth from '@/pages/oauth/OAuth';
import DailySentence from '@/pages/dailySentence/DailySentence';
import WordDetailView from '@/components/dailySentence/WordDetailView';
import VocaBook from '@/pages/word/VocaBook';
import WordQuiz from '@/pages/learn/WordQuiz';
import WordMemorize from '@/pages/learn/WordMemorize';
import ErrorPage from '@/pages/ErrorPage';
import Learn from './pages/learn/Learn';


function App() {

  //const {alert, modal, setModal} = Store(state=>state)

  // useEffect(() => {
  // }, [alert])

  function Router(){
    return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signin" element={<Login />}/>
      <Route path="/word/:folderId" element={<Word />}/>   
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signup-comp" element={<SignupComplete />}/>
			<Route path="/setPw" element={<SetPw />}/>
			<Route path="/authcomplete" element={<AuthNumComp />}/>
      <Route path="/mypage" element={<MyPage />}/>
      <Route path="/oauth/callback" element={<OAuth />}/>
      <Route path="/daily-sentence/main" element={<DailySentence />}/>
      <Route path="/daily-sentence/view" element={<WordDetailView />}/>
      <Route path="/vocabook" element={<VocaBook />}/>
      <Route path="/quiz" element={<WordQuiz />}/>
      <Route path="/memorize" element={<WordMemorize />}/>
      <Route path="/learn" element={<Learn />}/>
      <Route path="/*" element={<ErrorPage />}/>
    </Routes> 
    );
  }
  return (<PersistGate>
            <div>
              <Router />
              <Modals />
            </div>
        </PersistGate>
  );
}

export default App;
