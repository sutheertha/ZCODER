import './LoadProfile.css';

const LoadProfile = ({profileData}) => {
    return (
        <div className="profile-display-details">
            <div className="detail-section">
                <h2>Basic Information</h2>
                <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">
                        {profileData[0].city}, {profileData[0].region}, {profileData[0].country}
                    </span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Institution:</span>
                    <span className="detail-value">{profileData[0].institute}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">LinkedIn:</span>
                    <a href={`https://linkedin.com/${profileData[0].linkedin}`} className="detail-value link">
                        {profileData[0].linkedin}
                    </a>
                </div>
            </div>

            <div className="detail-section">
                <h2>Coding Profiles</h2>
                <div className="detail-item">
                    <span className="detail-label">GitHub:</span>
                    <a href={`https://github.com/${profileData[0].handles.github}`} className="detail-value link">
                        {profileData[0].handles.github}
                    </a>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Codeforces:</span>
                    <a href={`https://codeforces.com/profile/${profileData[0].handles.codeforces}`} className="detail-value link">
                        {profileData[0].handles.codeforces}
                    </a>
                </div>
                <div className="detail-item">
                    <span className="detail-label">AtCoder:</span>
                    <a href={`https://atcoder.jp/users/${profileData[0].handles.atcoder}`} className="detail-value link">
                        {profileData[0].handles.atcoder}
                    </a>
                </div>
                <div className="detail-item">
                    <span className="detail-label">LeetCode:</span>
                    <a href={`https://leetcode.com/${profileData[0].handles.leetcode}`} className="detail-value link">
                        {profileData[0].handles.leetcode}
                    </a>
                </div>
            </div>
        </div>
    );
}
 
export default LoadProfile;