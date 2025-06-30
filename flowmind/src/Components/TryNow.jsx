import React, { useState } from 'react'
import { Brain, Sparkles, Code } from "lucide-react";
import DSA from '../Sections/DSA';
import { ToastContainer, toast } from 'react-toastify';
import FlowChart from '../Sections/Flowchart';
import { useFlowchart } from '../Sections/Visual';
import { NavLink } from 'react-router-dom';
import { Play, ArrowRight } from "lucide-react";

function TryNow() {
    const [problem, setProblem] = useState("")
    const [solution, setSolution] = useState([])
    const [loading, setLoading] = useState(false)
    const [showSolution, setShowSolution] = useState(false);
    const { flowchart } = useFlowchart()
    const [flowloading, setFlowLoading] = useState(false);
    const [queen, setQueen] = useState(false);

    const handleGenerate = async () => {
        if (!problem) {
            toast.warn('Enter problem statement!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        if (problem.toLowerCase().includes("n-queen") || problem.toLowerCase().includes("n queens")) {
            setQueen(true);
        }
        setLoading(true);
        const data = await fetch("http://localhost:3000/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ problem })
        })

        const datas = await data.json()
        setSolution(datas)
        setLoading(false);
        setShowSolution(true)
        setProblem("")
    }

    return (
        <div className='pt-20 pb-20 px-4 bg-slate-800 '>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-400 font-medium">AI Algorithm Solver</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Solve Any DSA Problem
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Enter your algorithm problem, select a language, and let AI generate optimized solutions with flowchart-based visual explanations and deep complexity insights.
                </p>
            </div>

            {/* Input form for problem*/}
            <div className='flex gap-10 m-20'>
                {
                    showSolution ? <DSA solution={solution} setFlowLoading={setFlowLoading} /> :
                        <>
                            <div className='bg-slate-700/50 border-slate-700 border-2 rounded-lg p-6 w-1/2'>
                                <div className='text-white gap-2 flex items-center'>
                                    <Brain className="h-7 w-7 text-blue-400" />
                                    <div className='text-xl font-medium'>Problem Input</div>
                                </div>
                                <div className="text-lg font-medium text-gray-300 mt-5">Describe your algorithm problem</div>
                                <textarea onChange={(e) => setProblem(e.target.value)} value={problem} placeholder="e.g., Implement binary search to find a target element in a sorted array..."
                                    className="min-h-32 bg-slate-900 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 w-full p-2 rounded-2xl mt-5"
                                ></textarea>
                                {
                                    loading ? <button disabled={true} onClick={handleGenerate} className="font-medium w-full bg-gradient-to-r from-blue-700 to-purple-700 opacity-70 text-white mt-3 p-3 flex justify-center items-center">
                                        <Brain className="h-5 w-5 mr-2" />
                                        AI is thinking...
                                    </button> :
                                        <button onClick={handleGenerate} className="hover:rounded-xl hover:cursor-pointer font-medium w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-3 p-3 flex justify-center items-center">
                                            <Brain className="h-5 w-5 mr-2" />
                                            Generate Solution
                                        </button>
                                }
                            </div>
                        </>
                }
                <div className='bg-slate-700/50 border-slate-700 border-2 rounded-lg p-6 w-1/2'>
                    <div className="text-white gap-2 flex items-center">
                        <Code className="h-7 w-7 text-green-400" />
                        <div className='text-xl font-medium'>AI Flowchart</div>
                    </div>
                    {flowloading ?
                        <>
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </> :
                        <>
                            {queen ? < button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 transition transform hover:scale-105 rounded-2xl hover:to-purple-700 text-white border-0 text-lg px-8 py-6">
                                <NavLink to="/nqueen" className="flex items-center space-x-2">
                                    <Play className="h-5 w-5" />
                                    <span>N Queen Visual?</span>
                                    <ArrowRight className="h-5 w-5" />
                                </NavLink>
                            </button> :
                                flowchart?.trim() !== '' ? <FlowChart /> :
                                    <>
                                        <div className="text-center py-12 text-gray-400">
                                            <Code className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg font-medium mb-2">No flowchart yet</p>
                                            <p>Enter a problem and click "Generate Solution" to get started</p>
                                        </div>
                                    </>
                            }
                        </>}
                </div>

            </div>


        </div >
    )
}

export default TryNow
