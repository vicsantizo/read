import { Outlet } from 'react-router';

import './App.css';

function App() {
  return (
    <div>
      <div>App</div>
      <div className="layout">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
