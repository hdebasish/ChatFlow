import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import Error from './pages/error/error';
import ProtectedRoute from './components/protected/protected';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/reducers/authReducer';
import Cookies from 'js-cookie';
import { dashboardActions } from './redux/reducers/dashboardReducer';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    if (window.location.href.indexOf("?") !== -1 && window.location.href.split("?")[1] !== "") {
      const search = window.location.href.split("?")[1];
      const obj = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
      Cookies.set("filters", JSON.stringify(obj), { expires: 7 });
    }

  }, [])


  useEffect(() => {

    const savedFilters = Cookies.get("filters");
    if (savedFilters) {
      dispatch(dashboardActions.setFilter(JSON.parse(savedFilters)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>),
        errorElement: <Error />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      }
    ]
  );

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
