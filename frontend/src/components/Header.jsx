import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
function Header() {

  return (
    <header className = 'header'>
        <div className="logo">
           
        </div>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='login'>Login</Link>
    </header>
    
  )
}

export default Header