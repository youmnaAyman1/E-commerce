import React, { useContext } from 'react';
import logo from '../../images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContextProvider';
import { cartContext } from '../../context/CartContext/CartContext';


function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
 
const{numOfCartItems ,allProducts}=useContext(cartContext);


 
  function logout() {
    // Add a confirmation dialog here if needed
    setToken(null);
    localStorage.removeItem("tkn");
    navigate('/Login');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <figure>
            <img src={logo} alt="Fresh mart logo" />
          </figure>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item position-relative">
          <Link className="nav-link" to="/cart">Cart</Link>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {numOfCartItems? numOfCartItems :""}
    </span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wish list">Wish list</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AllOrders"> all orders</Link>
        </li>
            </ul>
          ) : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {/* Your social icons */}
            <li className="nav-item">
        <ul className=' Icons list-unstyled d-flex   ms-auto '>

                <li className='me-2'>
                <i className="fa-brands fa-instagram"></i>
                </li>
                <li className='me-2'>
                <i className="fa-brands fa-facebook-f"></i>
                </li>
                <li className='me-2'>
                <i className="fa-brands fa-tiktok"></i>
                </li>
                <li>
                <i className="fa-brands fa-square-twitter"></i>
                </li>
                <li className='me-2'>
                <i className="fa-brands fa-linkdin"></i>
                </li>

                <li className='me-2'>
                <i className="fa-brands fa-youtube"></i>

                </li>
                </ul>
                  </li>
            {token ? (
              <li className="nav-item">
                <span onClick={logout} role="button" className="nav-link">
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
