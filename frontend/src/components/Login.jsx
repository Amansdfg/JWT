import {useInput} from "../hooks/useInput.js";
import {isNotEmpty,hasMinLength} from "../util/validation.js"
import {Form, Link, useNavigation} from "react-router-dom";
import './Login.css'
export default function Login() {
    const navigation=useNavigation();
    const isSubmitting=navigation.state==="submitting";
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
    return (
        <Form className="form" method="POST">
            <h2 className="text-center text-white text-xl">Login</h2>
            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Username</label>
                    <input
                        id="email"
                        name="username"
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
                <Link to="/register" className="button">Register</Link>
                <button className="button button-flat">Reset</button>
                <button className="button" disabled={isSubmitting}>{isSubmitting ?"Submitting":"Login"}</button>
            </p>
        </Form>
    );
}