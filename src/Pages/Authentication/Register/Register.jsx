import React from "react";
import { useForm } from "react-hook-form";
import useAuth from './../../../hooks/useAuth';
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
const Register = () => {
  const {createUser} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", 
  });

  const onSubmit = (data) => {
   createUser(data.email, data.password)
      .then((userCredential) => {
        // User created successfully
        console.log("User created:", userCredential.user);
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Create Account </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
                    message:
                      "Password must contain uppercase, lowercase, and a number",
                  },
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn bg-[#caeb66] text-black mt-4">Login</button>
            </fieldset>
            <p>
              <small className="text-sm">
                Already have an account?<Link className="btn btn-link text-[#caeb66]" to="/login">Login</Link>
                
              </small>
            </p>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
