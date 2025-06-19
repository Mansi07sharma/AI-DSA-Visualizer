import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {
    Play,
    Sparkles,
    ArrowRight,
    Brain,
    Star,
    Github
} from "lucide-react";

function Home() {
    const [currentLine, setCurrentLine] = useState(0);

    const codeLines = [
        "function binarySearch(arr, target) {",
        "  let left = 0, right = arr.length - 1;",
        "  while (left <= right) {",
        "    let mid = Math.floor((left + right) / 2);",
        "    if (arr[mid] === target) return mid;",
        "    if (arr[mid] < target) left = mid + 1;",
        "    else right = mid - 1;",
        "  }",
        "  return -1;",
        "}"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev + 1) % codeLines.length);
        }, 1000)
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <div className="pt-20 pb-20 px-4 bg-slate-800 ">
                <div className="container mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-blue-400 font-medium">AI-Powered Algorithm Visualization</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">Master DSA with
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AlgoIQ</span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Transform any algorithm problem into an interactive visual experience. Get solutions in multiple programming languages with AI-powered explanations and animated step-by-step walkthroughs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 transition transform hover:scale-105 rounded-2xl hover:to-purple-700 text-white border-0 text-lg px-8 py-6">
                            <NavLink to="/trynow" className="flex items-center space-x-2">
                                <Play className="h-5 w-5" />
                                <span>Try AlgoIQ Now</span>
                                <ArrowRight className="h-5 w-5" />
                            </NavLink>
                        </button>

                        <button className="bg-slate-600 text-gray-300 hover:bg-slate-900 transition transform hover:scale-105 rounded-2xl hover:text-white text-lg px-8 py-6 flex justify-center items-center">
                            <Github className="h-5 w-5 mr-2" />View on GitHub
                        </button>
                    </div>

                    {/* Live Code Demo */}
                    <div>
                        <div className='flex items-center flex-start w-1/2 m-auto gap-3 bg-slate-700/90 rounded-lg p-4 '>
                            <div className='w-3 h-3 rounded-full bg-red-600'></div>
                            <div className='w-3 h-3 rounded-full bg-yellow-600'></div>
                            <div className='w-3 h-3 rounded-full bg-green-600'></div>
                            <h1 className='text-gray-300 font-medium text-lg'>algorithm.js</h1>
                        </div>

                        <div>
                            {codeLines.map((line, idx) => {
                                return (
                                    <div key={idx} className={`w-1/2 m-auto transition-all duration-500 text-lg p-1 ${idx === currentLine ?
                                        "text-blue-400 bg-blue-500/10 px-2 py-1 rounded" : "text-gray-500"} 
                                    }`}>{line}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
                <div className="container mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Brain className="h-6 w-6 text-blue-500" />
                        <span className="text-lg font-bold text-white">AlgoIQ</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                        Empowering developers with AI-driven algorithm visualization
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Home
