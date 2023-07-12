import { Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./pages/Home";
import { Reservation } from "./pages/Reservation";
import axios from "axios";
import { Header } from "./components/Header";
import { Details } from "./pages/Details";
import { Success } from "./pages/Success";
import { Error } from "./pages/Error";


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
        <Route path='/success' element={<Success />} />
        <Route path='/err' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
