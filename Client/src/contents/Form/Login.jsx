import { useFormik } from "formik";
import { createPortal } from "react-dom";
import AuthService from "../../services/auth/authService";
import { showToastError } from "../../config/toastConfig";
import iconImageLogo from '../../assets/images/icon-logo.jpg'

const Login = (props) => {
    const { isLoginOpen, onClose } = props
    if (!isLoginOpen) return null
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formilk = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const data = await AuthService.Login(values);
                if (!data) {
                    return
                }
                localStorage.setItem('token', JSON.stringify(data))
                onClose()
                window.location.reload()

                formilk.resetForm();
            } catch (error) {
                showToastError(error.response.data.message);
            }
        }
    })
    return createPortal(
        <>
            <form className="max-w-sm mx-auto" method="POST" onSubmit={formilk.handleSubmit}>
                <div className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 z-50" onClick={onClose}></div>
                <div className="z-50 fixed top-[10%] inset-0 w-[40%] h-[70%] bg-[#01adf1] p-5 left-[30%] ">
                    <div className="flex items-center justify-center gap-5 mb-4">
                        <img className="w-[100px] rounded-3xl" src={iconImageLogo} alt="" />
                        <h1 className="text-center font-bold text-[30px] text-[#333]">Đăng nhập</h1>
                    </div>
                    <div className="mb-5 ">
                        <label className="block pl-1 text-sm font-semibold text-gray-900 dark:text-white">Email:</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 " placeholder="name@gmail.com" required
                            onChange={formilk.handleChange}
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block pl-1 text-sm font-semibold text-gray-900 dark:text-white">Mật khẩu:</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="******"
                            onChange={formilk.handleChange}
                        />
                    </div>

                    <button type="submit" className="text-[#333] bg-[#fff] font-semibold rounded-lg text-sm w-full px-5 hover:bg-[#2cdfff] mb-2 py-3">Đăng nhập</button>
                </div>
            </form>
        </>,
        document.getElementById('portal-root')
    );
};

export default Login;