import React from 'react'


const Page404 = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

            {/* Image */}
            <div className="flex justify-center mb-6">
                <img
                    src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
                    alt="404 Not Found"
                    className="w-80 md:w-96 drop-shadow-lg"
                />
            </div>

            {/* Text */}
            <div className="text-center px-4">
                <h1 className="font-extrabold text-3xl md:text-4xl text-gray-800 dark:text-gray-200 leading-snug">
                    <span className="text-[#d01e1e]">Oops!</span> This is awkward...
                    <br />
                    <span className="text-gray-600 dark:text-gray-400">
                        You’re looking for something that doesn’t actually exist.
                    </span>
                </h1>
            </div>

            {/* Button */}
            <div className="mt-8">
                <a
                    href="/"
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    )
}

export default Page404;