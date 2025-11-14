import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/homePage';
import Login from './pages/login';
import Signup from './pages/sign';
import { Provider } from 'react-redux';
import store from './store/store';
import { checkAuth } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Problem from './components/problem';
import LandingPage from './components/landingPage';
import Solve from './components/solve';
import Admin from './components/Admin';
import AdminCreate from './components/AdminCreate';
import AdminDelete from './components/AdminDelete';
import AdminVideo from './components/AdminVideo';
import AdminUpload from './components/AdminUpload';
import { fetchProfile } from './store/profileSlice';
import MyProfile from './components/MyProfile';
import Leaderboard from './components/Leaderboard';
import Contest from './components/contest';



function App() {

  // just after opening of website make request to backend to check if user is authenticated or not
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const profile = useSelector((state)=>state.profile);
// console.log("here-->",profile);
  // console.log(user);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchProfile());
  }, [dispatch]); // it will run only once // also empty array also work

  // console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage></HomePage>}>
          {/* <Route path='/'  index  element={<LandingPage></LandingPage>}></Route> */}
          <Route path='/' element={isAuthenticated ? <LandingPage></LandingPage> : <Navigate to="/login" />}></Route>
          <Route path='/problem' element={isAuthenticated ? <Problem></Problem> : <Navigate to="/login" />}></Route>
          <Route path='/Leaderboard' element={isAuthenticated ? <Leaderboard></Leaderboard> : <Navigate to="/login" />}></Route>
          <Route path='/problem/:problemId' element={isAuthenticated ? <Solve></Solve> : <Navigate to="/login" />}></Route>
          <Route path='/admin' element={isAuthenticated && user?.role === 'admin' ? <Admin></Admin> : <Navigate to="/"></Navigate>}></Route>
          <Route path='/admin/create' element={isAuthenticated && user?.role === 'admin' ? <AdminCreate></AdminCreate> : <Navigate to="/"></Navigate>}></Route>
          <Route path='/admin/delete' element={isAuthenticated && user?.role === 'admin' ? <AdminDelete></AdminDelete> : <Navigate to="/"></Navigate>}></Route>
          <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo></AdminVideo> : <Navigate to="/" />} />
          <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload></AdminUpload> : <Navigate to="/" />} />
          <Route path={`/${user?.firstName}`} element={isAuthenticated ? <MyProfile></MyProfile> : <Navigate to="/" />} />
          <Route path='/contests' element={isAuthenticated ? <Contest></Contest> : <Navigate to="/login" />}></Route>
        </Route>
        <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login></Login>}></Route>
        <Route path='/signup' element={isAuthenticated ? <Navigate to="/" /> : <Signup></Signup>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
