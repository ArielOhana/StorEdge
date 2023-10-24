import '../Styles/HomePage.css'
import { Link } from 'react-router-dom';
import AdjustableNavBar from './AdjustableNavBar.jsx';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
import storagepicture from '../assets/storagepicture.png';
import facebook from "../assets/facebook-footer-white.png";
import twitter from "../assets/twitter-footer-white.png";
import linkedin from "../assets/linkedin-footer-white.png";
import youtube from "../assets/youtube-footer-white.png";
import appLogo from "../assets/storageicon.png";

const HomePage = () => {
    return (
      <div>
        <AdjustableNavBar>
            <Link to="/signin" style={{padding: '0 13px'}}><IconButton aria-label="Log in" sx={{ fontSize:40, mt: 'auto' }}>
                          <LoginIcon fontSize='large' />
                        </IconButton></Link>
        </AdjustableNavBar>
        <div className='homepage-main-div'>
        <div className='side-div'>
          <div className='header'>
        <span style={{rowCount:'1',fontSize:'2rem',color:'white'}}>Be Organized, Be Stor</span><span style={{fontSize:'2rem', color:'#B0D9B1'}}>Edge</span>
        </div>
        <p style={{marginBottom: '20px', color: 'white', margin: '6.7%'}}>✪  Using storage, you can get your data in the best shape! Organized and detailed with charts!</p> 
        <p style={{marginBottom: '20px', color: 'white', margin: '6.7%'}}>✪  You can create, delete or edit lists as you desire and update them all the time</p>       
        <p style={{marginBottom: '20px', color: 'white', margin: '6.7%'}}>✪  Create unique account for each or the members using the site!</p>       

        </div>
        <div className='picture-div'>
          <img src={storagepicture} alt="" />
        </div>
      </div>
      <div className="footer-container">
      <div className="footer-top">
        <div className="footer-top-left">
          <a href="#">
            <div className="title">
              <img src={appLogo} style={{ width: "50px", height: "50px" }} />
              <h2>StorEdge</h2>
            </div>
          </a>
          <p>
           Could you ever organize better? <br /> There’s a better way to organize
          </p>
        </div>
        <div className="footer-top-right">
          <div className="top-right-policies">
            <h2>Policies</h2>
            <p>Privacy Policy</p>
            <p>GDPR Policy</p>
            <p>Cookie Policy</p>
          </div>
          <div className="top-right-random">
            <p>Career</p>
            <p>Blog</p>
            <p>Portfolio</p>
            <p>Support</p>
            <p>Our Team</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>© 2023 StorEdge | All Rights Reserved.</p>
        <div className="footer-bottom-images">
          <img src={facebook} style={{ width: "28px", height: "28px" }} />
          <img src={twitter} style={{ width: "28px", height: "28px" }} />
          <img src={linkedin} style={{ width: "28px", height: "28px" }} />
          <img src={youtube} style={{ width: "27px", height: "27px" }} />
        </div>
      </div>
    </div>
      </div>
      
    );
  };
  export default HomePage;