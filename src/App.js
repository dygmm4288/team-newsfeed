import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { app } from './firebase/firebase.config';

function App() {
  console.log(app);
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
