import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "../store/authSlice";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { NavLink } from "react-router";
import { checkAuth } from "../store/authSlice";


export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="fixed top-4 right-6 z-50">
      {/* Profile Avatar + Name */}
      <div
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-2 cursor-pointer bg-[rgba(253,253,253,0)] border border-white/10 px-3 py-2 rounded-full shadow-md hover:bg-[rgba(46,41,95,0.8)] transition"
      >
        {/* Avatar Circle */}
        <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold">
          <DotLottieReact
            src="https://lottie.host/414c57de-cb12-486d-ae1b-8dc37354ac76/kRC9cIXArD.lottie"
            loop
            autoplay
          />
        </div>

        {/* Username */}
        <span className="text-white font-medium px-2">{user?.firstName}</span>
      </div>

      {/* Dropdown */}
      {showProfile && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white text-gray-800 overflow-hidden animate-fadeIn">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-gray-500">{user?.emailId}</p>
          </div>
          <div className="flex flex-col">
            <button className="px-4 py-2 text-left hover:bg-gray-100 transition">
              View Profile
            </button>
            {
              (user?.role === 'admin') ? (
                <NavLink to={'/admin'} className="px-4 py-2 text-left hover:bg-gray-100 transition">
                  <button >
                    Admin
                  </button>
                </NavLink>
              ) : <></>
            }
            <button
              onClick={() => dispatch(logoutUser())}
              className="px-4 py-2 text-left hover:bg-gray-100 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
