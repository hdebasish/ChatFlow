import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./signup.module.css"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/reducers/authReducer";
import { authSelector } from "../../redux/reducers/authReducer";
import { useEffect } from "react";
import { authActions } from "../../redux/reducers/authReducer";

export default function SignUp() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {error, user } = useSelector(authSelector);

    useEffect(() => {

        if(user){
            navigate('/');
        }

        if (error?.signup) {
            toast.error(error?.signup, {
                position: "bottom-center"
            });
            dispatch(authActions.setError(null));
        }

    }, [navigate, dispatch, error, user]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const currentUser = {
            name,
            email,
            password
        }

        try {
            dispatch(signUp(currentUser));
        } catch (error) {
            toast.error(error?.signup, {
                position: "bottom-center"
            });
            dispatch(authActions.setError(null));
        }

        e.target.reset();
    }

    return (<div className="container d-flex justify-content-center mt-5 vh-100">

        <div className={styles.wrapper}>
            <div className="card customBorder">
                <div className="card-body p-4">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <div className="d-flex justify-content-center align-items-center fs-3"><i className="bi bi-bar-chart-line-fill me-2 text-success"></i> <span className="fw-bold">ChartFlow</span></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Your Name</label>
                            <input type="name" className="form-control" id="nameInput" placeholder="John Doe" required name="name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" required name="email"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" className="form-control" id="passwordInput" placeholder="****" required name="password" minLength={4}/>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                        <input className="btn btn-success" type="submit" value="Sign Up" />
                        </div>
                        <div>
                            <p className="text-center">Already have an account? <Link to="/signin" className=" text-decoration-none text-success">Sign In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>);
}