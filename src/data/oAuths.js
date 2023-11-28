import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const providers = [
  {
    provider: GithubAuthProvider,
    name: 'github'
  },
  {
    provider: GoogleAuthProvider,
    name: 'google'
  }
];

export default providers;
