import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:5500",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}))

app.get("/:name/:stat", async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let years = []
    let stats = []
    const name = req.params.name;
    const stat = req.params.stat;
    console.log(name);
    console.log(stat);
    // console.log(name)
    fetch("https://nba-stats-db.herokuapp.com/api/playerdata/name/" + name, requestOptions)
        .then(response => response.json())
        .then(result => {
            let ans;

            // console.log(result.results)
            // console.log(result.results.length)
            for (let i = 0; i < result.results.length; i++) {
                if (stat == "Points"){
                    ans  = result.results[i].PTS/result.results[i].games;
                } else if (stat == "3s") {
                    ans  = result.results[i].three_fg/result.results[i].games;
                } else if (stat == "Minutes") {
                    ans  = result.results[i].minutes_played/result.results[i].games;
                }else if (stat == "Assists") {
                    ans  = result.results[i].AST/result.results[i].games;
                } else if (stat == "Rebounds") {
                    ans  = result.results[i].TRB/result.results[i].games;
                }
                stats.push(ans)
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
app.listen(port,'0.0.0.0', () => console.log(`server listening on port ${port} 🚀`))