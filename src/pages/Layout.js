import { Outlet } from "react-router-dom";
import '../css/App.css';

function clicked() {
  window.location.href = '/';
}

function Layout() {
  return (
    <div className="App">
      <header className="App-header" onClick={clicked}>
        Fullstack Challenge Scoreboard
      </header>
      
      <Outlet />
    </div>
  );
}

export default Layout;
