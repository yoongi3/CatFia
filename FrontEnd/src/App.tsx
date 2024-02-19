import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainMenuScreen } from "./Components/ui/MainMenuScreen";
import { JoinGameScreen } from "./Components/ui/JoinGameScreen";
import { CreateGameScreen } from "./Components/ui/CreateGameScreen";

import {WebSocketProvider} from './Components/sockets/WebSocketProvider';

function App() {
  return (
    <Router>
      <WebSocketProvider url="http://localhost:5001">
        <Routes>
          <Route path='/' element={<MainMenuScreen/>}/>
          <Route path='/CreateGame' element={<CreateGameScreen/>}/>
          <Route path='/JoinGame' element={<JoinGameScreen/>}/>
        </Routes>
      </WebSocketProvider>
    </Router>
  );
}

export default App;