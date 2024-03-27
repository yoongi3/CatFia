import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainMenuScreen } from "./Components/ui/MainMenuScreen";

import {WebSocketProvider} from './Components/sockets/WebSocketProvider';
import { HostScreen } from "./Components/ui/HostScreen";
import { PlayerScreen } from "./Components/ui/PlayerScreen";

function App() {
  return (
    <Router>
      <WebSocketProvider url={process.env.REACT_APP_SOCKET_SERVER_URL ?? ''}>
        <Routes>
          <Route path='/' element={<MainMenuScreen/>}/>
          <Route path='/Host' element={<HostScreen/>}/>
          <Route path='/Player' element={<PlayerScreen/>}/>
        </Routes>
      </WebSocketProvider>
    </Router>
  );
}

export default App;
