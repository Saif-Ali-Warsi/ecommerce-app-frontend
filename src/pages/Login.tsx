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
      toast.success("Login Successful");
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#191C24]">
      <div className="max-w-md w-full space-y-8 bg-[#191C24] p-8 rounded-3xl shadow-[12px_12px_24px_#101217,-12px_-12px_24px_#222631] border-0">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#d9a79c] tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-[#8A93A5] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Please sign in to your account
          </p>
        </div>

        {/* Global Error Message */}
        {errorMessage && (
          <div className="bg-[#191C24] shadow-[inset_2px_2px_5px_#101217,inset_-3px_-3px_7px_#222631] p-4 rounded-xl border border-red-500/20">
            <p className="text-sm text-red-400 font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Success Message */}
        {isLoggedIn && (
          <div className="bg-[#191C24] shadow-[inset_2px_2px_5px_#101217,inset_-3px_-3px_7px_#222631] p-4 rounded-xl border border-green-500/20">
            <p className="text-sm text-green-400 font-medium">
              Login Successful! Redirecting...
            </p>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-[#8A93A5] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                placeholder="Enter your username"
                className={`w-full px-5 py-3.5 bg-[#191C24] rounded-2xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none transition-all ${
                  errors.username
                    ? "shadow-[inset_2px_2px_5px_#EF4444,inset_-2px_-2px_5px_#222631]"
                    : "shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631]"
                }`}
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#8A93A5] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className={`w-full px-5 py-3.5 bg-[#191C24] rounded-2xl text-sm text-[#CFD4DC] placeholder-[#535C6D] focus:outline-none transition-all ${
                  errors.password
                    ? "shadow-[inset_2px_2px_5px_#EF4444,inset_-2px_-2px_5px_#222631]"
                    : "shadow-[inset_3px_3px_6px_#101217,inset_-3px_-3px_6px_#222631] focus:shadow-[inset_1px_1px_2px_#101217,inset_-1px_-1px_2px_#222631]"
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#191C24] text-[#d9a79c] font-bold py-4 px-4 rounded-2xl text-md shadow-[-6px_-6px_16px_#222631,6px_6px_16px_#101217] hover:shadow-[-3px_-3px_8px_#222631,3px_3px_8px_#101217] active:shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631] transition-all flex items-center justify-center gap-1.5 mt-4"
          >
            {loading ? "Processing.." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
