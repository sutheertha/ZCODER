import { useParams } from "react-router-dom";
import defaultPhoto from './defaultpfp.jpg';
import './ProfilePage.css';
import { useState, useMemo} from "react";
import GetPassword from "./GetPassword";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link, } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import LoadProfile from "./LoadProfile";
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';


const ProfilePage = () => {
    
    const {userID} = useParams();
    const { currentUser, login } = useAuth();
    const history = useHistory();
    const [newProfile,setNewProfile] = useState((userID ==='new'));
    const [signupStep, setSignupStep] = useState(newProfile ?'password':'null');
    const [pfpurl, setpfpurl] = useState('');
    const [userPf, setUserPf] = useState(currentUser!==null ? currentUser.userPf:defaultPhoto);
    const [username, setUsername] = useState(currentUser!==null ? currentUser.username:'');
    const [userpass, setUserpass] = useState('');
    const [country, setCountry] = useState(currentUser!==null ? currentUser.country:'');
    const [region, setRegion] = useState(currentUser!==null ? currentUser.region:'');
    const [city, setCity] = useState(currentUser!==null ? currentUser.city:'');
    const [institute, setInstitute] = useState(currentUser!==null ? currentUser.institute:'');
    const [linkedin, setLinkedin] = useState(currentUser!==null ? currentUser.linkedin:'');
    const [handles, setHandles] = useState({
        github: currentUser?.handles.github || '',
        codeforces: currentUser?.handles.codeforces || '',
        atcoder: currentUser?.handles.atcoder || '',
        leetcode: currentUser?.handles.leetcode || ''});
    

    const handleInputChange = (platform) => (e) => {
    setHandles((prev) => ({ ...prev, [platform]: e.target.value }));
    };
    const id = 785858;
    const isOwnProfile = currentUser && currentUser.id.toString() === userID;
    console.log(currentUser,'ho',isOwnProfile,userID);
    const profileData = useMemo(() => [{
    username,
    userPf,
    country,
    region,
    city,
    institute,
    linkedin,
    handles: { ...handles }
    }], [username, userPf, country, region, city, institute, linkedin, handles]);


    const handleCountryChange = (val) => {
        setCountry(val);
        setRegion('');
    };

    const getPFP = (e)=>{
        e.preventDefault();
        setUserPf(pfpurl);
    };

    const regionSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: isOwnProfile?userID:Math.floor(Math.random() * 1000000), // Generate unique ID
            username: username,
            userPf: userPf,
            country: country,
            region: region,
            city: city,
            institute: institute,
            linkedin: linkedin,
            handles: { ...handles },
            bookmarked: isOwnProfile?currentUser.bookmarked: []
        };
        // Log in the new user
        login(newUser);
        history.push(`/profile/${newUser.id}`);
        console.log('Form submitted:', 
        { country,region,city,institute, ...handles },);
        setSignupStep('null');
        setNewProfile(false);

    };

    return (
        <div className="profile-page-container">
            <span className="profile-page-title">
                {newProfile ? "Complete your Profile" : "User Profile"}
            </span>
             
            <div className="profile-body">
                <div className="profile-photo-container">
                    <ProfilePicture src={userPf} />
                    {(signupStep==='location') && <form onSubmit={getPFP } key='imageform'>
                        <label className="image-link">Enter profile image link:</label>
                        <input type='url' onChange={(e) => setpfpurl(e.target.value)}/>
                        <button>Load</button>
                    </form>}
                </div>
                {(newProfile) && <span className="user-details-container">
                    {(signupStep==='password') && 
                    <GetPassword username={username} setUsername={setUsername}
                                 userpass={userpass} setUserpass={setUserpass}
                                 setSignupStep={setSignupStep}/>}
                    {(signupStep==='location') &&
                    <form key='info1half'>
                        <label>Country</label>
                        <CountryDropdown value={country} onChange={handleCountryChange}
                        className="dropdn"/>
                        <label>State/Province</label>
                        <RegionDropdown country={country} value={region} onChange={setRegion} 
                        disableWhenEmpty={true} className="dropdn"/>
                        {[[city,setCity,'City'], [institute,setInstitute,'Name of Institution'],
                          [linkedin,setLinkedin,'Linkedin Profile']].map(([v,f,m]) => (
                            <div className="form-inpp"><label>{m}</label>
                            <input value={v} type="text" onChange={(e) => {f(e.target.value)}}/>
                            </div>))}
                    </form>}
                </span>}
                {!newProfile && <span className="user-details-container profile-username">
                    Welcome<br /><br />{username+' !'}
                    <div className="profile-control-buttons">
                        {isOwnProfile && (
                            <button onClick={() => {
                                setNewProfile(true);
                                setSignupStep('location')
                            }}>Edit Profile</button>
                        )}
                    </div>
                    
                </span>}
                {!newProfile && 
                    <span className="user-details-container">
                        <LoadProfile profileData={profileData}/>
                        
                    </span>}
                {(signupStep==='location') && <span className="user-details-container">
                     <br />
                     <form key='acc-created'>
                        {['github', 'codeforces', 'atcoder', 'leetcode'].map((platform) => (
                        <div className="form-inpp" key={platform}>
                            <label>{platform[0].toUpperCase() + platform.slice(1)} Handle</label>
                            <input
                            value={handles[platform]}
                            onChange={handleInputChange(platform)}
                            type="text"
                            />
                        </div>
                        ))}
                        <Link to={'/profile/' + id} className="signup-button">
                            <button onClick={regionSubmit} className="cracc">{isOwnProfile?'Modify':'Create'} account</button>
                        </Link>
                    </form>
                </span>}
            </div>
        </div>
    );
}
 
export default ProfilePage;