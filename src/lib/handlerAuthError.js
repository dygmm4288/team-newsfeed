export default function getErrorContent(code) {
  switch (code) {
    case 'auth/invalid-login-credentials':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return '이메일 혹은 비밀번호가 일치하지 않습니다.';

    case 'auth/network-request-failed':
      return '네트워크 연결에 실패 하였습니다.';

    case 'auth/internal-error':
      return '잘못된 요청입니다.';

    case 'auth/email-already-exists':
    case 'auth/email-already-in-use':
      return '이메일을 기존 사용자가 이미 사용 중입니다.';

    case 'auth/weak-password':
      return '비밀번호는 6글자 이상이어야 합니다.';

    case 'auth/invalid-email':
      return '잘못된 이메일 형식입니다.';

    case 'auth/account-exists-with-different-credential':
      return '이미 사용 중인 이메일로 로그인할 수 없습니다. 다른 로그인 방법을 선택해주십시오.';

    default:
      return '로그인에 실패 하였습니다.';
  }
}
