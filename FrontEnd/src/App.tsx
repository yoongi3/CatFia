import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainMenuScreen } from "./Components/ui/MainMenuScreen";
import { JoinGameScreen } from "./Components/ui/JoinGameScreen";
import { CreateGameScreen } from "./Components/ui/CreateGameScreen";
import { PlayerScreen } from "./Components/ui/PlayerScreen";

import {WebSocketProvider} from './Components/sockets/WebSocketProvider';

function App() {
  return (
    <Router>
      <WebSocketProvider url={process.env.REACT_APP_SOCKET_SERVER_URL ?? ''}>
        <Routes>
          <Route path='/' element={<MainMenuScreen/>}/>
          <Route path='/CreateGame' element={<CreateGameScreen/>}/>
          <Route path='/JoinGame' element={<JoinGameScreen/>}/>
          <Route path='/Lobby' element={<PlayerScreen/>}/>
        </Routes>
      </WebSocketProvider>
    </Router>
  );
}

export default App;
