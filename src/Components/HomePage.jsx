import '../Styles/HomePage.css'
import { Link } from 'react-router-dom';
import AdjustableNavBar from './AdjustableNavBar.jsx';
const HomePage = () => {
    return (
      <div>
        <AdjustableNavBar>
            <Link to="/signin" style={{padding: '0 13px'}}><h4>Sign In</h4></Link>
            <Link to="/signup" style={{padding: '0 13px'}}><h4>Sign Up</h4></Link>
        </AdjustableNavBar>
        Hello For now.
      </div>
    );
  };
  export default HomePage;