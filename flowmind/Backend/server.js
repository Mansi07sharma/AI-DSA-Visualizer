import express from 'express'
import { generateResponse, generateFlowchartFromCode} from './ApiWork.js'
import cors from 'cors';
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/generate', async (req, res) => {
    const problem = req.body;
    if (!problem) {
        return res.status(400).json({ error: "Problem is required" });
    }
    const response = await generateResponse(problem.problem);
    res.json(response);
})


app.post('/api/animation', async (req, res) => {
    const code = req.body;
    if (!code) {
        return res.status(400).json({ error: "Code should be there" })
    }

    const chart = await generateFlowchartFromCode(code.code);
    res.json({
        chart:chart
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})