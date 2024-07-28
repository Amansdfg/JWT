import {register} from "../../util/list.js";
import InputSection from "./InputSection.jsx";
import {useNavigate} from "react-router-dom";
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
        <form  className="mt-8 grid grid-cols-6 gap-6">
            {register.map(item => (
                <InputSection key={item.id} id={item.id} name={item.name}/>
            ))}
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
                    <a href="#" className="text-gray-700 underline">Log in</a>.
                </p>
            </div>
        </form>
    )
}