import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainMenuScreen } from "./Components/ui/MainMenuScreen";
import { JoinGameScreen } from "./Components/ui/JoinGameScreen";
import { CreateGameScreen } from "./Components/ui/CreateGameScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainMenuScreen/>}/>
        <Route path='/CreateGame' element={<CreateGameScreen/>}/>
        <Route path='/JoinGame' element={<JoinGameScreen/>}/>
      </Routes>
    </Router>
  );
}

export default App;
