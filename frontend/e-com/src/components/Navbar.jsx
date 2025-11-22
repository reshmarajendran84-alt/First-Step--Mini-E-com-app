import React from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-gray-900 text-white px-6 py-3 flex justify-beteen">
        <h1  className="bg-info text-xl font-bold cursor-pointer"
        onClick={() => navigate("/products")}>First Step </h1>
        <div>
          <Link to="/" className="Hover:text-gray-300">Home</Link>
          <Link to="/products" className="Hover:text-gray-300">Products</Link>
          <Link to ="/addprouct" className="Hover:text-300">AddProduct</Link>
        </div>
        <input type="text" placeholder='Serach Here' className='px-3 py-1 rounded bg-gray-700 text-white'/>

      </nav>
    </div>
  )
}

export default Navbar
