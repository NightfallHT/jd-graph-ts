import functionPlot from "function-plot";

let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
let ratio = contentsBounds.width / width;
let c = 1;
width *= ratio;
height *= ratio;

functionPlot({
    target: "#x",
    width,
    height,
    yAxis: { domain: [-1, 9] },
    grid: false,
    data: [
        {
            fn: `(${c}x^2+x)/(x^2-x)`,
            graphType: "polyline",
            // derivative: {
            //   fn: "2 * x",
            //   updateOnMouseMove: true
            // }
        }
    ]
});
