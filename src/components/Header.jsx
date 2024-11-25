import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import instanceAdmin from "../axios/axiosAdmin";
import { useNavigate } from "react-router-dom";
import Config from "../config/config";


export const Header = () => {
    const navigate = useNavigate();
    const userSelector = useSelector((state) => state.users);
    const accessToken = userSelector.accessToken;

    const confirmLogout = () => {
      
      Swal.fire({
        title: "Are you sure to Logout?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3E8F9F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then( async (result) => {
        if (result.isConfirmed) {
          const data = await instanceAdmin.delete('/logout');
          if (data) {
            localStorage.clear();
            Swal.fire({
              title: "Succed Logout!",
              text: "You Successfully Logout.",
              icon: "success",
              confirmButtonColor: "#3E8F9F"
            }).then( (result) => {
              if (result.isConfirmed) {
                window.location.href = Config.BaseUrl + '/login';
              }
            });
            // window.location.href = "http://localhost:5173/login";
          }         

        }
      });
    };

    return (
        <>
          <div className="navbar bg-base-100 shadow-md px-4 sticky top-0">
            <div className="flex-1">
              {/* Logo */}
              <a className="btn btn-ghost normal-case text-xl text-primary-dark">
                Logo
              </a>
            </div>
            
            {/* Menu Links */}
            <div className="hidden lg:flex flex-none lg:pr-8">
              <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">
                <li><Link to="/" className="text-primary hover:text-primary-dark">Home</Link></li>
                <li><Link to="/about" className="text-primary hover:text-primary-dark">About</Link></li>
                {/* <li><Link to="/about" className="text-primary hover:text-primary-dark">hai{userSelector.accessToken}</Link></li> */}
              </ul>
            </div>

            {/* Icons and Profile */}
            <div className="flex items-center space-x-2">
              {/* Status Badge and Avatar */}
              <div className="hidden lg:flex items-center space-x-2">

                {
                  accessToken.length < 1 ?
                    <>
                      <span className="px-6 btn btn-sm outline outline-2 text-primary outline-primary rounded-full hover:bg-primary hover:text-white">
                        <Link to="/login">Login</Link>
                      </span>
                      <span className="px-6 btn btn-sm bg-primary outline outline-2 outline-primary rounded-full hover:bg-primary-dark text-white">
                        <Link to="/register">Sign Up</Link>
                      </span>
                    </>
                    :
                    <>
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                          <img src="https://i.pravatar.cc/300" alt="User Avatar" className="w-10 rounded-full outline outline-1 outline-primary" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                          <li><a>Settings</a></li>
                          <li><a className="text-red-600" onClick={confirmLogout}>Log out</a></li>
                        </ul>
                      </div>
                    </>
                }
         
              </div>
            </div>

            {/* Dropdown for Mobile */}
            {/* <details className="dropdown dropdown-end lg:hidden">
              <summary className="btn m-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </details> */}

            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                <li><Link to="/" className="text-primary">Home</Link></li>
                <li><Link to="/about" className="text-primary">About</Link></li>
                <hr className="bg-slate-400 mt-2 mb-2" />
                <li><a>Settings</a></li>
                <li><a className="text-red-600" onClick={confirmLogout}>Log out</a></li>
              </ul>
            </div>
          </div>
        </>
    )
}