import {useInput} from "../../hooks/useInput.js";
import {isNotEmpty,hasMinLength} from "../../util/validation.js"
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
        <Form className="w-full sm:w-[28rem] p-8 bg-custom-gradient rounded-2xl shadow-custom" method="POST">
            <h2 className="text-center text-white text-xl">Login</h2>
            <div className="flex flex-col w-full justify-start gap-4">
                <div className="mb-4 m-0">
                    <label className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold" htmlFor="email">Username</label>
                    <input
                        className="block w-full p-2 text-base rounded-md border-2 border-[#758a8a] bg-[#869999] text-[#142020]"
                        id="email"
                        name="username"
                        onBlur={handleEmailBlur}
                        onChange={handleEmailChange}
                        value={emailValue}
                    />
                    {emailHasError && <div className="text-[#ffca99] h-8 text-sm py-2 px-0">Invalid Email</div> }
                </div>

                <div className="mb-4 m-0">
                    <label className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold" htmlFor="password">Password</label>
                    <input
                        className="block w-full p-2 text-base rounded-md border-2 border-[#758a8a] bg-[#869999] text-[#142020]"
                        id="password"
                        type="password"
                        name="password"
                        onBlur={handlePasswordBlur}
                        onChange={handlePasswordChange}
                        value={passwordValue}
                        autoComplete="username"
                    />
                    {passwordHasError && <div className="text-[#ffca99] h-8 text-sm py-2 px-0">Invalid Password</div>}
                </div>
            </div>

            <p className="flex flex-col gap-4 sm:flex-row justify-between my-[10px] mx-auto">
                <Link to="/register" className="text-center py-2 px-4 text-base rounded-md border-none bg-[#147b73] text-[#d9e2f1] cursor-pointer hover:bg-[#319890] focus:[#319890]">Register</Link>
                <button className="py-2 px-4 text-base rounded-md border-none bg-[#147b73] text-[#d9e2f1] cursor-pointer button-flat hover:bg-transparent hover:text-[#9cbaba]">Reset</button>
                <button className="py-2 px-4 text-base rounded-md border-none bg-[#147b73] text-[#d9e2f1] cursor-pointer hover:bg-[#319890] focus:[#319890]" disabled={isSubmitting}>{isSubmitting ?"Submitting":"Login"}</button>
            </p>
        </Form>
    );
}