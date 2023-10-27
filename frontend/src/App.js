import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Reservation } from "./pages/Reservation";

import { Header } from "./components/Header";
import { Details } from "./pages/Details";
import { Success } from "./pages/Success";
import { Error } from "./pages/Error";
import { Bookings } from "./pages/Bookings";
import { ManageBookings } from "./adminView/ManageBookings";
import { ManageCustomers } from "./adminView/ManageCustomers";
import { ManageRooms } from "./adminView/ManageRooms";

import EditRoom from "./adminView/EditRoom";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";
import { Admin } from "./adminView/Admin";


function App() {
  return (
    <div className="App ">
      <Header />
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />


        <Route path='/rooms'>
          <Route path='' element={<Home />} />
          <Route path={`:roomNum`} element={<Details />} />
        </Route>
        <Route path='/customers'>
          <Route path='' element={<Reservation />} />
          <Route path={`:empId`} element={<Bookings />} />
        </Route>

        <Route path='/admin' >
          <Route path={''} element={<Admin />} />
          <Route path={'bookings'} element={<ManageBookings />} />
          <Route path={`rooms`}>
            <Route path='' element={<ManageRooms />} />
            <Route path={`:roomNum`} element={<EditRoom />} />
          </Route>
          <Route path={`customers`} element={<ManageCustomers />} />
        </Route>
        <Route path='/success' element={<Success />} />
        <Route path='/err' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
