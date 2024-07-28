import {register} from "../../util/list.js";
import InputSection from "./InputSection.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useInput} from "../../hooks/useInput.js";
import {hasMinLength, isEmail,isStartWithUpperCase, isNotEmpty} from "../../util/validation.js";
import axios from "../../util/axios.js";

export default function From(){
    const navigate=useNavigate();
    const {
        value:firstNameValue,
        handleInputChange:handleFirstNameChange,
        handleInputBlur : handleFirstNameBlur,
        hasError:firstNameHasError,
    } = useInput('',(value)=>isNotEmpty(value) && isStartWithUpperCase(value));
    const {
        value:lastNameValue,
        handleInputChange:handleLastNameChange,
        handleInputBlur : handleLastNameBlur,
        hasError:lastNameHasError,
    } = useInput('',(value)=>isNotEmpty(value) && isStartWithUpperCase(value));
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
    const {
        value:passwordConfirmationValue,
        handleInputChange:handlePasswordConfirmationChange,
        handleInputBlur:handlePasswordConfirmationBlur,
        hasError:passwordConfirmationHasError,
    }=useInput('',(value)=>isNotEmpty(value) && hasMinLength(value,6));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/aman/registration', {
                firstName:firstNameValue,
                lastName: lastNameValue,
                username:emailValue,
                password:passwordValue,
                confirmPassword: passwordConfirmationValue,
                email: emailValue,
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
        <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>

                <input
                    id="FirstName"
                    name="first_name"
                    className="mt-1 p-2.5 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                    type="text"
                    onBlur={handleFirstNameBlur}
                    onChange={handleFirstNameChange}
                    value={firstNameValue}
                />
                {firstNameHasError && <div className="control-error">Invalid FirstName</div> }
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                       type="text"
                       id="LastName"
                       name="last_name"
                       className="mt-1 p-2.5 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                       onBlur={handleLastNameBlur}
                       onChange={handleLastNameChange}
                       value={lastNameValue}
                />
                {lastNameHasError && <div className="control-error">Invalid LastName</div> }
            </div>
            <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                <input
                       type="email"
                       id="Email"
                       name="email"
                       className="mt-1 p-2.5 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                       onBlur={handleEmailBlur}
                       onChange={handleEmailChange}
                       value={emailValue}
                />
                {emailHasError && <div className="control-error">Invalid Email</div> }
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                <input
                       type="text"
                       id="Password"
                       name="password"
                       className="mt-1 p-2.5 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                       onBlur={handlePasswordBlur}
                       onChange={handlePasswordChange}
                       value={passwordValue}
                />
                {passwordHasError && <div className="control-error">Invalid Email</div> }
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                </label>
                <input
                    // type="password"
                    type="text"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="mt-1 p-2.5 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm"
                    onBlur={handlePasswordConfirmationBlur}
                    onChange={handlePasswordConfirmationChange}
                    value={passwordConfirmationValue}
                />
                {passwordConfirmationHasError && <div className="control-error">Invalid Email</div> }
            </div>
            <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input type="checkbox" id="MarketingAccept" name="marketing_accept"
                           className="size-5 p-2.5 rounded-md border bg-white shadow-sm"/>
                    <span className="text-sm text-gray-700">
                  I want to receive emails about events, product updates and company announcements.
                </span>
                </label>
            </div>
            <div className="col-span-6">
                <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                    and
                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                </p>
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">Create
                    an account
                </button>
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <Link to="/login" className="text-gray-700 underline">Log in</Link>.
                </p>
            </div>
        </form>
    )
}