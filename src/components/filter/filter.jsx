import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import { dashboardActions, getFeatures, getTrend } from "../../redux/reducers/dashboardReducer";
import { dashboardSelector } from "../../redux/reducers/dashboardReducer";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function Filters() {
    const dispatch = useDispatch();

    const { selected, filter } = useSelector(dashboardSelector);

    useEffect(() => {
    
        if (filter) {
            dispatch(getFeatures(filter));
        }

        
    }, [filter, dispatch]);

    useEffect(() => {

        if (selected) {
            const newFilter = { ...filter, category: selected };
            dispatch(getTrend(newFilter));
        }
    }, [filter, selected, dispatch]);

    const handleInputChange = (name, value) => {
        dispatch(dashboardActions.setFilter({
            ...filter,
            [name]: value,
        }));

    };

    return (
        <div className="card customBorder p-3">
            <div className="card-body">
                <h5 className="card-title"><i className="bi bi-funnel-fill"></i> Filters</h5>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="age">Age:</label>
                            <select
                                id="age"
                                className="form-control"
                                value={filter?.age}
                                onChange={(e) => handleInputChange("age", e.target.value)}
                            >
                                <option value="15-25">{'15-25'}</option>
                                <option value=">25">{'>25'}</option>
                                <option value="any">{'Any'}</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                className="form-control"
                                value={filter?.gender}
                                onChange={(e) => handleInputChange("gender", e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="any">Any</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="start_date">Start Date:</label>
                            <input
                                type="date"
                                id="start_date"
                                className="form-control"
                                value={filter?.start_date}
                                onChange={(e) => handleInputChange("start_date", e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="end_date">End Date:</label>
                            <input
                                type="date"
                                id="end_date"
                                className="form-control"
                                value={filter?.end_date}
                                onChange={(e) => handleInputChange("end_date", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                const defaultFilters = {
                                    age: 'any',
                                    gender: 'any',
                                    start_date: '2022-10-04',
                                    end_date: '2022-10-29',
                                };
                                dispatch(dashboardActions.setFilter(defaultFilters));
                                Cookies.remove("filters");
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
