import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/admin/products" className="hover:text-gray-300">Products</Link>
          <Link to="/admin/add-product" className="hover:text-gray-300">Add Product</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
