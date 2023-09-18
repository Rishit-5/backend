const graphDiv = document.getElementById("graph");

fetch(
    // https://oa-2023-24-backend.onrender.com
    // "https://gorgeous-pink-galoshes.cyclic.cloud/" + "Lebron James" //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
    "http://localhost:3000/" + "Stephen Curry"
).then(async res => {
    Plotly.newPlot( graphDiv, [ await res.json() ]);
})

