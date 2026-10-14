import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../services/authService";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginFormData = {
  username: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  // const inputRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   function focusInput() {
  //     inputRef.current?.focus();
  //   }

  //   focusInput();
  // }, []);

  async function onSubmit(data: LoginFormData) {
    setLoading(true);

    try {
      setErrorMessage("");

      const user = await loginUser(data);

      login(user);
      setIsLoggedIn(true);

      navigate("/");
      toast.success("Login successful");
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#d9a79c] tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Global Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Success Message */}
        {isLoggedIn && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
            <p className="text-sm text-green-700 font-medium">
              Login Successful! Redirecting...
            </p>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                placeholder="Enter your username"
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.username
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-[#d9a79c] focus:ring-[#d9a79c]"
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 focus:border-[#d9a79c] focus:ring-[#d9a79c]"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#d7a296] hover:bg-[#d9a79c] text-white font-bold py-5 px-3 rounded-lg text-md border-2 border-[#8c5245] shadow-[4px_4px_0px_0px_#8c5245] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#8c5245] transition-all flex items-center justify-center gap-1.5"
          >
            {loading ? "Processing.." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
