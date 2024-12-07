import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import { useEffect } from "react";
import { getUser } from "../../redux/reducers/authReducer";
import { authActions } from "../../redux/reducers/authReducer";
import { GridLoader } from "react-spinners";

export default function ProtectedRoute({ children }) {

    const { user, loading, error } = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!user) {
            dispatch(authActions.setLoading(true));
            dispatch(getUser());
        }else{
            dispatch(authActions.setLoading(false));
        }

        if(error?.getUser){
            navigate('/signin')
            dispatch(authActions.setError(null));
        }

    }, [dispatch, navigate, error, user]);

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

    if (user) {
        return children;
    }

}