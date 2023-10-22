import Link from 'next/link';
import { useRouter } from 'next/router';
import '../styles/style.css';

function Home() {
  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();

    // Redirect to the menu page.
    router.push('/menu');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleLogin} action="/menu" method="post">
        {/* form의 action을 /menu로 변경하여 메뉴 페이지로 리다이렉트 */}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
        <br />
        <button type="submit">Login</button>
        <a href="/signUp" className="signup-btn">Sign Up</a>
        <div id="error-message" className="error"></div>
      </form>
      {/* non-member 버튼에 Link 컴포넌트 적용 */}
      <Link href="/menu">
        <button className="non-member-btn">Non-member</button>
      </Link>
    </div>
  );
}

export default Home;
