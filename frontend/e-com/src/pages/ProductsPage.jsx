import React from 'react'
import { useContext } from 'react'
import { ProductsContext } from '../Context/ProductsContext'
function ProductsPage() {
    const {products} =useContext(ProductsContext);

  return (
    <div>
      <h1 className='text-2xl-font-bold'>All Products</h1>
    <div>
        
    </div>
    </div>
  )
}

export default ProductsPage
