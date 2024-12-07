import Filters from "../../components/filter/filter";
import BarChart from "../../components/barChart/barChart";
import LineChart from "../../components/lineChart/lineChart";
import { dashboardSelector } from "../../redux/reducers/dashboardReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/authReducer";
import { useEffect } from "react";
import { setParams } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import { dashboardActions } from "../../redux/reducers/dashboardReducer";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Dashboard() {

    const { selected, filter } = useSelector(dashboardSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const filters = {
            age: queryParams.get("age") || "any",
            gender: queryParams.get("gender") || "any",
            start_date: queryParams.get("start_date") || "2022-10-04",
            end_date: queryParams.get("end_date") || "2022-10-29",
        };
        Cookies.set("filters", JSON.stringify(filters), { expires: 7 });
        setParams(filters, navigate);

    }, []);

    useEffect(() => {

        if (filter) {
            Cookies.set("filters", JSON.stringify(filter), { expires: 7 });
            setParams(filter, navigate);
        }

    }, [filter]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard', {
            position: "bottom-right",
        });
    };

    const handleSignOut = () => {
        dispatch(logout());
        navigate('/signin');
    }



    return (<>
        <nav className="navbar bg-body-tertiary customBorderNav ">
            <div className="container-fluid d-flex justify-content-between">
                <div className="navbar-brand">
                    <div>
                        <div className="d-flex justify-content-center align-items-center fs-3"><i className="bi bi-bar-chart-line-fill me-2 text-success"></i> <span className="fw-bold">ChartFlow</span></div>
                    </div>
                </div>
                <div class="d-grid gap-2 d-md-block">
                    <button class="btn btn-light me-3" onClick={handleCopyLink} type="button"><i class="bi bi-share"></i> Share</button>
                    <button className="btn btn-dark" onClick={handleSignOut}><i class="bi bi-box-arrow-left"></i> Sign Out</button>

                </div>
            </div>
        </nav>
        <div className="container text-center my-4">
            <h1 className="display-4 text-success">Interactive Data Visualization Dashboard</h1>
            <p className="lead text-muted">
                Analyze and visualize your data in real-time with interactive charts and advanced filters.
            </p>
        </div>
        <div className="container">
            <div className="row m-3">
                <div className="col-12">
                    <Filters />
                </div>
            </div>
            <div className="row m-3">
                <div className="col-12">
                    <BarChart />
                </div>
            </div>
            <div className="row m-3">
                <div className="col-12">
                    {selected && <LineChart />}
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>);
}