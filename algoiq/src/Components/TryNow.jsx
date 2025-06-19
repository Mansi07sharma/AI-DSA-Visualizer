import React from 'react'
import { Brain, Sparkles, Code } from "lucide-react";

function TryNow() {
    return (
        <div className='pt-20 pb-20 px-4 bg-slate-800 '>
            <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-400 font-medium">AI Algorithm Solver</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Solve Any DSA Problem
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Input your problem, choose a language, and watch AI create solutions with animated visualizations
                </p>
            </div>

            {/* Input form for problem*/}
            <div className='flex gap-10 m-20'>
                <div className='bg-slate-700/50 border-slate-700 border-2 rounded-lg p-6 w-1/2'>
                    <div className='text-white gap-2 flex items-center'>
                        <Brain className="h-7 w-7 text-blue-400" />
                        <div className='text-xl font-medium'>Problem Input</div>
                    </div>
                    <div className="text-lg font-medium text-gray-300 mt-5">Describe your algorithm problem</div>
                    <textarea placeholder="e.g., Implement binary search to find a target element in a sorted array..."
                        className="min-h-32 bg-slate-900 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 w-full p-2 rounded-2xl mt-5"
                    ></textarea>
                    <button className="hover:rounded-xl hover:cursor-pointer font-medium w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-3 p-3 flex justify-center items-center">
                        <Brain className="h-5 w-5 mr-2" />
                        Generate Solution
                    </button>
                </div>

                <div className='bg-slate-700/50 border-slate-700 border-2 rounded-lg p-6 w-1/2'>
                    <div className="text-white gap-2 flex items-center">
                        <Code className="h-7 w-7 text-green-400" />
                        <div className='text-xl font-medium'>AI Solution</div>
                    </div>
                    <div className="text-center py-12 text-gray-400">
                        <Code className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No solution yet</p>
                        <p>Enter a problem and click "Generate Solution" to get started</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TryNow
