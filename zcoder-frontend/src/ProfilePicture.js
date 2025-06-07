import { useState, useEffect } from "react";
import defaultPhoto from './defaultpfp.jpg';

const ProfilePicture = ({src}) => {

    const isValidUrl = (url) => {
        try {
        new URL(url);
        return true;
        } catch {
        return false;
        }
    };

    const [currentSrc, setCurrentSrc] = useState( isValidUrl(src) ? src : defaultPhoto);

    useEffect(() => {
        setCurrentSrc(isValidUrl(src) ? src : defaultPhoto);
        const allData = JSON.parse(localStorage.currentUser)
        allData.userPf = isValidUrl(src) ? src : defaultPhoto;
        localStorage.setItem('currentUser', JSON.stringify(allData));
    }, [src]);

    
    return(
        <img 
            src={currentSrc} 
            alt="User-Profile-Picture" 
            onError={() => {
                setCurrentSrc(defaultPhoto);
            }
        }/>
    );
};

export default ProfilePicture;