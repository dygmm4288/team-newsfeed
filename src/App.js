import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import { AuthProvider } from './contexts/auth.context';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
