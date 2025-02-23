import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

  
    const [error, setError] = useState("");
    const handleLogin = (e) => {
      e.preventDefault();
      setError("");
      const email = e.target.email.value;
        const password = e.target.password.value;

      signInUser(email, password)
        .then(() => {
          e.target.reset();
          navigate("/task-manager");
          Swal.fire({
            icon: "success",
            title: "Login successful!",
        })
  
  
        })
        .catch((error) => {
          setError("Invalid email or password. Please try again.");
          Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Unexpected server response. Please try again.",
        });
        });
    };

    const handleLoginWithGoogle = () => {
      signInWithGoogle()
        .then(() => {
         
            navigate("/task-manager");
          Swal.fire({
            icon: "success",
            title: "Login successful with Google!",
        })
  
  
  
        })
        .catch((error) => {
          console.error("Google login error:", error.message);
          Swal.fire({
            icon: "error",
            title: "Google Login failed",
            text: "Unexpected server response. Please try again.",
        });
        });
    };

    return (
        <div
            className=""

        >
            <section className="bg-gray-50 dark:text-white dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login Here
                            </h1>
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                                <button
                                    onClick={handleLoginWithGoogle}
                                    type="button"
                                    className="flex items-center justify-center w-full text-black border-2 bg-primary-600 hover:bg-gray-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:text-slate-400 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <FcGoogle size={24} className="mr-2" />
                                    Login with Google
                                </button>

                                <div className="inline-flex items-center justify-center w-full">
                                    <hr className="w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                                        or
                                    </span>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your Password"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full  hover:bg-gray-400 border-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Login
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account?{" "}
                                    <Link
                                        to={"/registration"}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
