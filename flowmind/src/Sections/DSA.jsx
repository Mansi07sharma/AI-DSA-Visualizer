import React, { useState, useEffect } from 'react'
import { FileCode2, Code2, Copy, ArrowBigRightDash } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';
import { useFlowchart } from './Visual';

function DSA({ solution ,setFlowLoading}) {
    const [currentTitle, setCurrentTitle] = useState(solution[0].title)
    const [currentLang, setCurrentLang] = useState("javaCode");

    const selectedCode = solution.find(s => s.title === currentTitle)?.code[currentLang] || '';
    const [code, setCode] = useState(selectedCode);
    const { generatedFC, updateFlowchart } = useFlowchart()

    useEffect(() => {
        const newCode = solution.find(s => s.title === currentTitle)?.code[currentLang] || '';
        setCode(newCode);
    }, [currentTitle]);

    useEffect(() => {
        setFlowLoading(true)
        const fetchChart = async () => {
            if (!code || code.trim() === '') return;
            const exist = generatedFC.find(fc => fc.title === currentTitle);

            if (exist) {
                updateFlowchart(exist.chart, exist.title)
                setFlowLoading(false)
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/animation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ code })
                });

                const outputs = await response.json();
                updateFlowchart(outputs.chart,currentTitle)
                setLoading(false);
                console.log("Flowchart:", outputs.chart);
            } catch (err) {
                console.error("Error fetching flowchart:", err);
            }
        };

        fetchChart();
        //whenver title change the check also... whenever saving then also check bcz to reflect changes
    }, [code, currentTitle, generatedFC]);


    const handleCopy = () => {
        const selected = solution.find(s => s.title === currentTitle);
        const selectedCode = selected?.code?.[currentLang] || '';

        navigator.clipboard.writeText(selectedCode);
        toast.success('Copied!!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    return (
        <div className='w-1/2'>
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
            <div className='rounded-t-xl p-5 flex flex-col bg-gray-900 items-center gap-10'>
                <h1 className='underline w-full flex text-white font-medium justify-start gap-4 text-2xl  items-center'><FileCode2 className='w-7 h-7 text-blue-400'></FileCode2>
                    Problem Solutions</h1>
                <div className='flex items-center gap-5'>
                    {solution.map((titles, idx) => {
                        return (
                            <button key={idx} value={titles.title} onClick={(e) => setCurrentTitle(e.target.value)} className='hover:bg-black hover:cursor-pointer transition-all transform hover:scale-105 p-3 font-medium bg-blue-900 text-white rounded-2xl'>{titles.title}</button>
                        )
                    })}
                </div>
            </div>

            <div className='bg-gray-400 p-5 rounded-b-xl'>
                {solution.map((titles, idx) => {
                    if (titles.title == currentTitle) {
                        return (
                            <>
                                <p key={idx} className='text-xl font-medium'>{titles.description}</p>
                                <div key={idx} className='flex flex-col gap-3 mt-5'>
                                    <div key={idx} className='flex gap-5 text-lg'>
                                        <h1 key={idx} className='underline'>Time Complexity</h1>
                                        <p key={idx}>{titles.timeComplexity}</p>
                                    </div>
                                    <div key={idx} className='flex gap-5 text-lg'>
                                        <h1 key={idx} className='underline'>Space Complexity</h1>
                                        <p key={idx}>{titles.spaceComplexity}</p>
                                    </div>
                                </div>

                                <div key={idx} className='m-3 mt-6 rounded-xl text-white bg-gray-900 overflow-hidden'>
                                    <div key={idx} className='flex justify-between items-center p-4 bg-gray-600'>
                                        <ul key={idx} className='flex gap-7 text-lg items-center'>
                                            <Code2 key={idx} className='w-7 h-7' />
                                            <li onClick={() => setCurrentLang('javaCode')} className='hover:bg-white  hover:rounded-2xl  hover:text-black h-full p-2 w-fit hover:cursor-pointer transition-all transform hover:scale-105' key={idx}>java</li>
                                            <li onClick={() => setCurrentLang('cppCode')} className='hover:bg-white hover:rounded-2xl  hover:text-black h-full p-2 w-fit hover:cursor-pointer transition-all transform hover:scale-105' key={idx}>cpp</li>
                                            <li onClick={() => setCurrentLang('jsCode')} className='hover:bg-white  hover:rounded-2xl  hover:text-black h-full p-2 w-fit hover:cursor-pointer transition-all transform hover:scale-105' key={idx}>java script</li>
                                            <li onClick={() => setCurrentLang('pythonCode')} className='hover:bg-white  hover:rounded-2xl  hover:text-black h-full p-2 w-fit hover:cursor-pointer transition-all transform hover:scale-105' key={idx}>python</li>
                                        </ul>
                                        <Copy className='h-7 w-7 hover:cursor-pointer' onClick={handleCopy} />
                                    </div>
                                    <div key={idx} className='p-7'>
                                        <pre key={idx}>
                                            {currentLang == "javaCode" ? <code key={idx}>{titles.code.javaCode}</code> :
                                                currentLang == 'cppCode' ? <code key={idx}>{titles.code.cppCode}</code> :
                                                    currentLang == 'pythonCode' ? <code key={idx}>{titles.code.pythonCode}</code> : <code key={idx}>{titles.code.jsCode}</code>
                                            }
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <div key={idx} className='flex flex-col justify-center items-center gap-5 p-2 mt-5'>
                                        <div key={idx} className='w-full flex flex-col gap-3 p-4 rounded-2xl bg-lime-200/70'>
                                            <h1 key={idx} className='text-lg font-bold underline'>Pros</h1>
                                            {titles.pros.map((pros, idx) => {
                                                return (
                                                    <p key={idx + idx} className='italic flex items-center'>
                                                        <ArrowBigRightDash key={idx + idx} className='h-5 w-5' />
                                                        {pros}</p>
                                                )
                                            })}
                                        </div>
                                        <div key={idx} className='w-full flex flex-col gap-3 p-4 rounded-2xl bg-red-200/70'>
                                            <h1 key={idx} className='text-lg font-bold underline'>Cons</h1>
                                            {titles.cons.map((cons, idx) => {
                                                return (
                                                    <p key={idx + idx} className='italic flex items-center'>
                                                        <ArrowBigRightDash key={idx + idx} className='h-5 w-5' />
                                                        {cons}</p>
                                                )
                                            })}
                                        </div>

                                    </div>
                                </div>
                            </>
                        )
                    }
                })}


            </div>
        </div>
    )
}

export default DSA
