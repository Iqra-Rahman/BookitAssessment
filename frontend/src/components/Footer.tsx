// import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6">
        <div>
          <div className="text-lg font-semibold">BookEasy</div>
          <p className="text-sm text-gray-600 mt-2">
            Simple booking flows for memorable experiences.
          </p>
        </div>

        <div>
          <div className="font-medium mb-2">Quick links</div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:underline">Checkout</Link>
            </li>
            <li>
              <Link to="/result" className="hover:underline">Result</Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-2">Contact</div>
          <p className="text-sm text-gray-600">support@bookeasy.example</p>
          <p className="text-sm text-gray-600 mt-2">Made with ♥ — © {year} BookEasy</p>
        </div>
      </div>
    </footer>
  );
}
