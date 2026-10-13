import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../services/authService";
import { useState } from "react";

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

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function onSubmit(data: LoginFormData) {
    try {
      setErrorMessage("");

      const user = await loginUser(data);

      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);

      console.log("Login successful:", user);
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  }

  return (
    <>
      <h1>Login</h1>

      {errorMessage && <p>{errorMessage}</p>}

      {isLoggedIn && <p>Login Successful!</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("username")}
            type="text"
            placeholder="Enter User Name"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">login</button>
      </form>
    </>
  );
}

export default Login;
