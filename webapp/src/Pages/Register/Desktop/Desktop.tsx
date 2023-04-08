import React from "react";
import './Desktop.css'
import RegisterArt from '../../../Assets/RegisterArt.jpg'
import Blob1 from '../../../Assets/Blobs/Blob1.svg'
import Blob4 from '../../../Assets/Blobs/Blob4.svg'
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';

export default function Desktop() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const cookies = new Cookies();

    const onSubmit = (data: any) => {
        console.log(data);
        // make the api call
        fetch('http://localhost:3001/createAccount', {
            method: 'POST',
            //cors should not be used
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }
        ).then((data1) => {
            console.log(data1);
            if (data1.status == true) {
                cookies.set('token', data1.token, { path: '/' });
                window.location.href = '/dashboard';
            }
        });
    };

    return (
        <div>
            <div className="split left">
                <div className="centered">
                    <img src={RegisterArt} alt='Alert' />
                    <h2>Register</h2>
                    <p>Stay Alert.</p>
                </div>
                <img src={Blob1} className="RegisterBlob1" alt='Blob1' />
                <img src={Blob4} className="RegisterBlob4" alt='Blob4' />
            </div>

            <div className="split right">
                <div className="centered">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label>Email</label>
                            <br />
                            <input type="text" {...register("email", {
                                required: true,
                            })} />
                            {errors.email && errors.email.type === "required" && (
                                <p className="errorMsg">Email is required.</p>
                            )}
                        </div>
                        <br />
                        <div className="form-control">
                            <label>Password</label>
                            <br />
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
            </div>
        </div>
    )
}