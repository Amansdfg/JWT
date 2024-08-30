import {useInput} from "../../hooks/useInput.js";
import {isNotEmpty,hasMinLength} from "../../util/validation.js"
import {Form, Link, useNavigation} from "react-router-dom";
import './Login.css'
import logo from "../../assets/chatgramLogo.png"
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
        <Form className="px-6 py-4 mx-6 my-4 md:m-0 md:bg-transparent w-auto  md:w-[30%] bg-slate-800 rounded-2xl shadow-custom" method="POST">
            <img src={logo} className="w-[50%] mx-auto md:"/>
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
                    <div className="flex justify-between">
                        <label className="text-sm mb-1 text-[#9bafaf] uppercase font-bold" htmlFor="password">Password</label>
                        <Link to="/reset" className="text-sm mb-1 text-[#9bafaf] uppercase font-bold">Forgot password?</Link>
                    </div>
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

            <p className="flex flex-col gap-2 lg:gap-4 sm:flex-row justify-between my-[10px]">
                <Link to="/register" className="text-center py-2 px-4 text-base rounded-md border-none bg-[#147b73] text-[#d9e2f1] cursor-pointer hover:bg-[#319890]">Register</Link>
                <button className="py-2 px-4 text-base rounded-md border-none bg-[#147b73] text-[#d9e2f1] cursor-pointer hover:bg-[#319890]">Reset</button>
                <button className="py-2 px-4 text-base rounded-md border-none bg-[#147b73] text-[#d9e2f1] cursor-pointer hover:bg-[#319890]" disabled={isSubmitting}>{isSubmitting ?"Submitting":"Login"}</button>
            </p>
        </Form>
    );
}