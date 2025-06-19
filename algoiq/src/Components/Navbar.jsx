
import { Brain, Zap } from "lucide-react";
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="text-white bg-slate-800/95 ">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <NavLink to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
                    <Brain className="h-8 w-8 text-blue-500" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        AlgoIQ
                    </span>
                </NavLink>

                <div className="flex items-center gap-6">
                    <NavLink to="/" className="text-lg font-medium transition-colors hover:text-blue-400 ">Home</NavLink>
                    <NavLink to="/trynow" className="text-lg font-medium transition-colors hover:text-blue-400 ">Try Now</NavLink>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 transition transform hover:scale-105 rounded-2xl hover:from-blue-700 hover:to-purple-700 p-3 text-white border-2 border-blue-700">
                        <NavLink to="/trynow" className="flex items-center space-x-2">
                            <Zap className="h-4 w-4" />
                            <span>Get Started</span>
                        </NavLink>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
