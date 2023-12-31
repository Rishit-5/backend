const graphDiv = document.getElementById("graph");
let player = "Stephen Curry"
let stat;
document.getElementById("Submit").onclick = function(){
    player = document.getElementById("player").value;
    stat = document.getElementById("stat").value;

    fetch(
        // https://oa-2023-24-backend.onrender.com
        "https://dssdbackend.zeabur.app/" + player + "/" + stat  //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
         // "http://localhost:3000/" + player + "/" + stat
    ).then(async res => {
        Plotly.newPlot( graphDiv, [ await res.json() ]);
    })
}


