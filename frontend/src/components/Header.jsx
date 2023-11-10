import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

function Header() {

  return (
    <header className = 'header'>
        <div className="logo">
           
        </div>
        <ul>
            Places
        </ul>
    </header>
    
  )
}

export default Header