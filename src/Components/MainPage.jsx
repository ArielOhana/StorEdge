import { useContext, useEffect } from 'react';
import '../Styles/MainPage.css'
import { UserContext } from '../App';
import AdjustableNavBar from './AdjustableNavBar';
import { Link, useNavigate } from 'react-router-dom';

export default function MainPage()  {
    const { user, setUser } = useContext(UserContext);
    console.log(user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user.username) {
          navigate("/error");
        }
      }, [user, navigate]);
    
    return (
        <>
        <AdjustableNavBar>
        <Link to="/" style={{ padding: "0 13px" }}>
          <h4>Log out</h4>
        </Link>
        
        </AdjustableNavBar>
        <div>
            MainPage.
        </div>
        </>
    )
}
