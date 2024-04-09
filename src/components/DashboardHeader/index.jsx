import React from 'react';

import './styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
function DashboardHeader ({ btnText, onClick }) {
    const { name, profilePhoto } = useGetUserInfo();
    return(
        <div className='dashbord-header-container'>
            {btnText && 
                <button className='dashbord-header-btn' onClick={onClick}>{btnText}</button>
            }

            <div className='dashbord-header-right'>
                <img 
                    src={NotificationIcon}
                    alt='notification-icon'
                    className='dashbord-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' />
                    {profilePhoto && (
        <img className="dashbord-header-avatar" src={profilePhoto} alt="Profile" />)}
              
            </div>
        </div>
    )
}

export default DashboardHeader;