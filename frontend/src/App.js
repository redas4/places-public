import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Header from './components/Header'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Login
        </p>
        <Login />
      </header>
    </div>
  );
}

export default App