import { Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./pages/Home";
import { Reservation } from "./pages/Reservation";
import axios from "axios";
import { Header } from "./components/Header";
import { Details } from "./pages/Details";


function App() {
  return (
    <div className="App ">
      <Header />
      <Routes>
        <Route path='/rooms'>
          <Route path='' element={<Home />} />
          <Route path={`:roomNum`} element={<Details />} />
        </Route>
        {/* <Route path='/login' element={<Login />} />
        <Route path='/account' element={<Account />} /> */}
        <Route path='/customers' element={<Reservation />} />
      </Routes>
    </div>
  );
}

export default App;
