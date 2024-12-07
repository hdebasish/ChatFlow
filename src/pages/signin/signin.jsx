import styles from "./signin.module.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../redux/reducers/authReducer";
import { signIn } from "../../redux/reducers/authReducer";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from "../../redux/reducers/authReducer";
import { GridLoader } from "react-spinners";

export default function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, user, loading } = useSelector(authSelector);

    useEffect(() => {

        if(user){
            navigate('/');
            dispatch(authActions.setLoading(true));
        }

        if (error?.signin) {
            toast.error(error.signin, {
                position: "bottom-center"
            });
            dispatch(authActions.setError(null));
        }

    }, [navigate, dispatch, error, user]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const currentUser = {
            email,
            password
        }

        try {
            dispatch(signIn(currentUser));
        } catch (error) {
            toast.error(error?.signin, {
                position: "bottom-center"
            });
            dispatch(authActions.setError(null));
        }

        e.target.reset();
    }

    if (loading) {
        return <GridLoader
            color="#198754"
            cssOverride={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            margin={2}
            size={15}
        />
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
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" required name="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" className="form-control" id="passwordInput" placeholder="****" required name="password" minLength={4}/>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <input className="btn btn-success" type="submit" value="Sign In" />
                        </div>
                        <div>
                            <p className="text-center">Don't have an account? <Link to="/signup" className=" text-decoration-none text-success">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>);
}