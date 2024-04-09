import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../config/Firebase';
import SideBarItem from './sidebar-item';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import LogoutIcon from '../../assets/icons/logout.svg';

function SideBar ({ menu }) {
    const location = useLocation();
const navigate = useNavigate();
    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }
    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
               <span><h2>Project Tracker</h2><br /></span>
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer'>
                    

       
                        <span className='sidebar-item-label'>Logout</span>
                        <img onClick={signUserOut}
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;