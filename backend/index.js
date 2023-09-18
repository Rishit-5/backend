import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:63342",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}))

app.get("/:name", async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let years = []
    let stats = []
    const name = req.params.name;
    console.log(name)
    fetch("https://nba-stats-db.herokuapp.com/api/playerdata/name/" + name, requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result.results)
            console.log(result.results.length)
            for (let i = 0; i < result.results.length; i++) {
                stats.push(result.results[i].three_fg/result.results[i].games)
                years.push(result.results[i].season)

            }
            }
        ).then(result =>
        res.send({
            x: years,
            y: stats
        }).status(200)
    )
        .catch(error => console.log('error', error));
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))