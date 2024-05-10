import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import CreateQuiz from "./pages/CreateQuiz";
import PlayQuiz from "./pages/PlayQuiz";
//importing help page and components with nested routes
import Help from "./pages/Help";
import HelpIntro from "./components/HelpPageComponents/HelpIntro";
import HelpCreate from "./components/HelpPageComponents/HelpCreate";
import HelpPlay from "./components/HelpPageComponents/HelpPlay";

function App() {


  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path={'/'} element={ <Home/> }></Route>
            <Route path={'/create'} element={ <CreateQuiz/> }></Route>
            <Route path={'/play'} element={ <PlayQuiz/> }></Route>
            <Route path={'/help'} element={ <Help/> }>
                <Route path={''} element={ <HelpIntro/> }></Route>
                <Route path={'helpCreate'} element={ <HelpCreate/> }></Route>
                <Route path={'helpPlay'} element={ <HelpPlay/> }></Route>
            </Route>
            <Route path={'*'} element={ <PageNotFound/> }></Route>
        </Routes>
    </div>
  );
}

export default App;
