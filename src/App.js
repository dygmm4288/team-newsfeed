import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Router from './Router';
import { AuthProvider } from './contexts/auth.context';
import PostProvider from './contexts/post.context';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <GlobalStyle />
          <Router />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
