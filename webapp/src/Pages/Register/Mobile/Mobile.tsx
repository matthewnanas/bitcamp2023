import React from "react";
import './Mobile.css'
import { useForm } from "react-hook-form";

export default function Mobile() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="centered">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Email</label>
                    <input type="text" {...register("email", {
                        required: true,
                    })} />
                    {errors.email && errors.email.type === "required" && (
                        <p className="errorMsg">Email is required.</p>
                    )}
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type="password" {...register("password", {
                        required: true,
                        minLength: 8
                    })} />
                    {errors.password && errors.password.type === "required" && (
                        <p className="errorMsg">Password is required.</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <p className="errorMsg">
                        Password should be at-least 8 characters.
                        </p>
                    )}
                </div>
                <br />
                <div className="form-control">
                    <label></label>
                    <button type="submit" className="SignUp">Login</button>
                </div>
            </form>
        </div>
    )
}