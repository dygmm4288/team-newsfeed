import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

import { useEffect } from 'react';
import { app } from './firebase/firebase.config';

function App() {
  useEffect(() => {
    console.log(app);
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
