import { FaBarsStaggered } from "react-icons/fa6";
import { BiExitFullscreen } from 'react-icons/bi'
import { GoScreenFull } from 'react-icons/go'
import { useState } from "react";


export default function Header({ handleAsideOpen }) {
   
    const [isFullScreen, setIsFullscreen] = useState(false);

    const toggleFullScreen = () => {
        if(!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            })
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            })
        }
    }

    return <>
        <header className="header flex flex-sb">
            <div className="logo flex gap-2">
                <h1>ADMIN</h1>
                <div className="headerham flex flex-center" onClick={handleAsideOpen}>
                <FaBarsStaggered />
                </div>
            </div>
            <div className="rightnav flex gap-2">
                <div onClick={toggleFullScreen}>
                    {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
                </div>
                <div className="notification">
                    <img src="/img/notification.png" alt="notification"/>
                </div>
                <div className="profilenav">
                    <img src="/img/user.png" alt="user"/>
                </div>
            </div>
        </header>
   
    </>
}