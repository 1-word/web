import logo from './logo.svg';
import './App.css';
import WordPaper from './wordPaper/wordPaper';
import WordPaperMobile from './wordPaperMobile/wordPaperMobile';
import Login from './login/login';
import { useMediaQuery } from 'react-responsive';
import { BrowerRouter, Routes, Route} from 'react-router-dom'

function App() {
  const isMobile = useMediaQuery({query: "(max-width: 1080px)",});
  const isDesktop = useMediaQuery({query: "(min-width: 1081px)",});
  return (
    <Routes>
      <Route path="/" element={
        <div>
        {isMobile ? 
        <WordPaperMobile></WordPaperMobile> : <WordPaper></WordPaper>
        }
      </div>
      }/>
      <Route path="/login" element={<Login></Login>}/>
    </Routes>
  );
}

export default App;
