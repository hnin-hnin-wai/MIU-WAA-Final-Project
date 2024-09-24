import logo from './logo.svg';
import './App.scss';
import Property from './components/property/property';
import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './routes';
import Header from './components/header/header';
import LeftPanel from './components/left/left-panel';
import PropertyFilter from './components/property/property-filter';
import { UserService } from "./service/userservice";
import { useEffect, useState } from "react";
import "./pages/customer/customer.css"

function App() {
  return (
    <div className="App mt-2 bg-indigo-50">
       {/*<PropertyFilter></PropertyFilter>*/}
      <BrowserRouter>
        <div className='g-sidenav-show '>
          <LeftPanel></LeftPanel>
          <main className='main-content py-2'>
            <Header className="mb-5"></Header>
            <PageRoutes></PageRoutes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
