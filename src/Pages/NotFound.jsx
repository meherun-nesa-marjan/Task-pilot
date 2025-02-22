
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative flex justify-center">
          <h1 className="text-9xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
            404
          </h1>
          <div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
            <div className="w-44 h-44 border-4 border-dashed rounded-full border-pink-500"></div>
          </div>
        </div>

        {/* Error message */}
        <p className="mt-6 text-2xl font-semibold">
          Oops! The page you're looking for doesn’t exist.
        </p>
        <p className="mt-2 text-gray-400">
          It might have been moved or deleted.
        </p>

        {/* Button with hover effect */}
        <div className="mt-8">
          <Link
            to="/"
            className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg hover:scale-105 transform hover:shadow-2xl transition-transform duration-300"
          >
            Go Back Home
          </Link>
        </div>

        {/* Decorative illustration */}
        <div className="mt-12">
          <div className="flex justify-center items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6598/6598512.png"
              alt="Lost Robot"
              className="w-48 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
