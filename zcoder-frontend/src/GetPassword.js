import { useState } from "react";

const GetPassword = ({username, 
                      setUsername, 
                      userpass, 
                      setUserpass, 
                      setSignupStep}) => {

    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({
        username: false,
        password: false,
        confirmPassword: false
    });

    const validate = () => {
        const newErrors = {};

        if (!username.trim()) {
        newErrors.username = 'Username is required';
        } else if (username.length < 4) {
        newErrors.username = 'Username must be at least 4 characters';
        } else if (username.length > 20) {
        newErrors.username = 'Username must be less than 20 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        newErrors.username = 'Username can only contain letters, numbers and underscores';
        }

        
        if (!userpass) {
        newErrors.password = 'Password is required';
        } else if (userpass.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(userpass)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(userpass)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[0-9]/.test(userpass)) {
        newErrors.password = 'Password must contain at least one number';
        } else if (!/[^A-Za-z0-9]/.test(userpass)) {
        newErrors.password = 'Password must contain at least one special character';
        }

        if (userpass !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==='un') setUsername(value);
        else if(name==='ps') setUserpass(value);
        else if(name==='cp') setConfirmPassword(value);
        
        
        if (touched[name]) validate();
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validate();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({
        username: true,
        password: true,
        confirmPassword: true
        });
        
        if (validate()) {
            console.log('Form submitted:', username, userpass, confirmPassword);
            setSignupStep('location');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <label>Enter Username</label>
            <input
                type="text" id="username" name="un"
                value={username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.username && errors.username ? 'error' : ''} />
                {touched.username && errors.username && (
                    <div className="error-message">{errors.username}</div>
                )}
            <label>Enter Password</label>
            <input
                type="password" id="password" name="ps"
                value={userpass}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? 'error' : ''} />
                {touched.password && errors.password && (
                    <div className="error-message">{errors.password}</div>
                )}
            <label>Confirm Password</label>
            <input
                type="password" id="confirmPassword" name="cp"
                value={confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}/>
                {touched.confirmPassword && errors.confirmPassword && (
                    <div className="error-message">{errors.confirmPassword}</div>
                )}
            <button className="cracc"> Next </button>
        </form>);
}

export default GetPassword;