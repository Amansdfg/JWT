import {useInput} from "../hooks/useInput.js";
import {isEmail,isNotEmpty,hasMinLength} from "../util/validation.js"
import axios from '../util/axios';
import {useNavigate} from "react-router-dom";
import './Login.css'
export default function Login() {
    const navigate=useNavigate();
    const {
        value:emailValue,
        handleInputChange:handleEmailChange,
        handleInputBlur : handleEmailBlur,
        hasError:emailHasError,
    } = useInput('',(value)=>isNotEmpty(value));
    const {
        value:passwordValue,
        handleInputChange:handlePasswordChange,
        handleInputBlur:handlePasswordBlur,
        hasError:passwordHasError,
    }=useInput('',(value)=>isNotEmpty(value) && hasMinLength(value,6));


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/aman/auth', {
                username: emailValue,
                password:passwordValue
            });
            localStorage.setItem('token', response.data.token);
            if(response.data.token){
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex justify-center items-center w-screen h-screen">
        <form onSubmit={handleSubmit} className="form">
            <h2 className="text-center text-white text-xl">Login</h2>
            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Username</label>
                    <input
                        id="email"
                        name="email"
                        onBlur={handleEmailBlur}
                        onChange={handleEmailChange}
                        value={emailValue}
                    />
                    {emailHasError && <div className="control-error">Invalid Email</div> }
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        onBlur={handlePasswordBlur}
                        onChange={handlePasswordChange}
                        value={passwordValue}
                        autoComplete="username"
                    />
                    {passwordHasError && <div className="control-error">Invalid Password</div>}
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
        </div>
    );
}
