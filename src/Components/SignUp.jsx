import { Link } from 'react-router-dom'
import '../Styles/SignUp.css'
import AdjustableNavBar from './AdjustableNavBar'

export default function SignUp() {
    return (
<>
<AdjustableNavBar>
<Link to="/signin" style={{padding: '0 13px'}}><h4>Sign In</h4></Link>
<Link to="/" style={{padding: '0 13px'}}><h4>Home Page</h4></Link>
</AdjustableNavBar>
</>
    )
}
