

// import { TimePicker } from '@mui/x-date-pickers';

import { Link } from "react-router"



function Homepage() {


    return (
        <>

            <div className="min-h-screen flex flex-col items-center text-white  from-black via-black to-violet-900"
                style={{
                    background: "radial-gradient(circle at center, #1f1f1f, #0f0f0f, #2d0a48)",
                }}
            >
                {/* Hero Section */}
                <section className="w-full max-w-6xl text-center py-20 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Simplify Your Weekly Scheduling with Ease
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8">
                        Manage recurring weekly slots with full flexibility. Create, update,
                        delete, and customize your schedule without hassle.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link to="/getStarted">
                            <button className="px-8 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-lg font-semibold shadow-lg">
                                Get Started Free
                            </button>
                        </Link>



                        <button className="px-8 py-3 rounded-2xl border border-violet-400 hover:bg-violet-800/30 text-lg font-semibold shadow-lg">
                            Try Demo
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full max-w-5xl px-6 py-16 text-center">
                    <h2 className="text-4xl font-bold mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                        <div className="p-6 bg-white/10 rounded-2xl shadow-md">
                            <h3 className="text-xl font-semibold mb-3">Recurring Weekly Slots</h3>
                            <p className="text-gray-300">
                                Set your schedule once, and let it repeat every week.
                            </p>
                        </div>
                        <div className="p-6 bg-white/10 rounded-2xl shadow-md">
                            <h3 className="text-xl font-semibold mb-3">Two Slots per Day</h3>
                            <p className="text-gray-300">
                                Define up to 2 slots (start & end times) for each day.
                            </p>
                        </div>
                        <div className="p-6 bg-white/10 rounded-2xl shadow-md">
                            <h3 className="text-xl font-semibold mb-3">Exception Handling</h3>
                            <p className="text-gray-300">
                                Modify specific dates without affecting your recurring pattern.
                            </p>
                        </div>
                        <div className="p-6 bg-white/10 rounded-2xl shadow-md">
                            <h3 className="text-xl font-semibold mb-3">Slot Management</h3>
                            <p className="text-gray-300">
                                Create, update, or delete slots effortlessly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Calendar + Pictures Section */}
                <section className="w-full max-w-6xl px-6 py-20 text-center">
                    <h2 className="text-4xl font-bold mb-12">Visualize Your Schedule</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Calendar Placeholder */}
                        <div className="flex items-center justify-center h-96 bg-white/10 rounded-2xl shadow-lg">
                            <p className="text-gray-400">📅 Calendar Placeholder</p>
                        </div>
                        {/* Pictures Placeholder */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="h-44 bg-white/10 rounded-2xl shadow-md flex items-center justify-center text-gray-400">
                                Image 1
                            </div>
                            <div className="h-44 bg-white/10 rounded-2xl shadow-md flex items-center justify-center text-gray-400">
                                Image 2
                            </div>
                            <div className="h-44 bg-white/10 rounded-2xl shadow-md flex items-center justify-center text-gray-400">
                                Image 3
                            </div>
                            <div className="h-44 bg-white/10 rounded-2xl shadow-md flex items-center justify-center text-gray-400">
                                Image 4
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="w-full max-w-4xl px-6 py-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Ready to take control of your weekly schedule?
                    </h2>
                    <button className="px-10 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-lg font-semibold shadow-lg">
                        Sign Up Now
                    </button>
                </section>

                {/* Footer */}
                <footer className="w-full text-center py-6 border-t border-white/10 text-gray-400 text-sm">
                    <p>© 2025 SchedulerApp. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}

export default Homepage
