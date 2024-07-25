import {useInput} from "../hooks/useInput.js";
import {isEmail,isNotEmpty,hasMinLength} from "../util/validation.js"
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate=useNavigate();
    const {
        value:emailValue,
        handleInputChange:handleEmailChange,
        handleInputBlur : handleEmailBlur,
        hasError:emailHasError,
    } = useInput('',(value)=>isEmail(value) && isNotEmpty(value));
    const {
        value:passwordValue,
        handleInputChange:handlePasswordChange,
        handleInputBlur:handlePasswordBlur,
        hasError:passwordHasError,
    }=useInput('',(value)=>isNotEmpty(value) && hasMinLength(value,6));


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/aman/auth', {
                username:emailValue,
                password:passwordValue
            });
            localStorage.setItem('token', response.data.token);
            if(response.data.token){
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
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
                    />
                    { passwordHasError && <div className="control-error">Invalid Password</div> }
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
