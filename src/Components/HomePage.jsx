import '../Styles/HomePage.css'
import { Link } from 'react-router-dom';
import AdjustableNavBar from './AdjustableNavBar.jsx';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
const HomePage = () => {
    return (
      <div>
        <AdjustableNavBar>
            <Link to="/signin" style={{padding: '0 13px'}}><IconButton aria-label="Log in" sx={{ fontSize:40, mt: 'auto' }}>
                          <LoginIcon fontSize='large' />
                        </IconButton></Link>
        </AdjustableNavBar>
        Hello For now.
      </div>
    );
  };
  export default HomePage;