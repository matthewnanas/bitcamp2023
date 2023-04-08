import React from "react";
import './Mobile.css'
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';

export default function Mobile() {
    const cookies = new Cookies();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        fetch('http://localhost:3001/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }
        ).then((data1) => {
            console.log(data1);
            if (data.success) {
                cookies.set('token', data1.token, { path: '/' });
                window.location.href = '/dashboard';
            }
        });
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
                    <button type="submit" className="SignUp">Sign Up</button>
                    <button type="submit" className="SignUp" style={{marginLeft: '20px'}}>Login</button>
                </div>
            </form>
        </div>
    )
}