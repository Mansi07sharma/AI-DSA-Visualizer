import { useContext, createContext, useState } from "react";

const FlowchartContext = createContext()

export const FlowchartProvider = ({ children }) => {
    const [flowchart, setFlowchart] = useState('');
    const [generatedFC, setGeneratedFC] = useState([])

    const updateFlowchart = (chart,title) => {

        const fc=generatedFC.find(fc=>fc.title===title)
        if(fc){
            setFlowchart(fc.chart);
            return;
        }

        const newfc={chart,title}
        setGeneratedFC(prev=>[...prev,newfc]);
        setFlowchart(chart)
    }

    return (
        <FlowchartContext.Provider value={{ flowchart,generatedFC, updateFlowchart}}>
            {children}
        </FlowchartContext.Provider>
    )
}

export const useFlowchart = () => useContext(FlowchartContext)