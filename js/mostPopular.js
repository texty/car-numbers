/**
 * Created by yevheniia on 25.01.19.
 */

var barChart = d3.select("svg#barChart"),
    barChartmargin = { top: 20, right: 20, bottom: 30, left: 40 },
    barChartX = d3.scaleBand().padding(0.1),
    barChartY = d3.scaleLinear();

var bounds = barChart.node().getBoundingClientRect(),
    barChartWidth = bounds.width - barChartmargin.left - barChartmargin.right,
    barChartHeight = bounds.height - barChartmargin.top - barChartmargin.bottom;

var g = barChart.append("g")
    .attr("transform", "translate(" + barChartmargin.left + "," + barChartmargin.top + ")");

g.append("g")
    .attr("class", "axis axis--x");

g.append("g")
    .attr("class", "axis axis--y");


g.append("text")
// .attr("transform", "rotate(-90)")
    .attr("x", barChartWidth / 2 )
    .attr("y", barChartHeight + 20)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Номери")
    .style("font-size", "12px");




d3.csv("./data/chart_data_1.csv", function(barChartData) {


    barChartData.forEach(function(d) {
        return d.count = +d.count;
    });

    var theData = barChartData.sort(function (a, b) {
        return b.count - a.count; // sort by weight, low to heigh
    }).slice(0, 15);

    barChartX.domain(theData.map(function (d) { return d.digits; }));
    barChartY.domain([0, d3.max(theData, function (d) { return d.count; })]);

    draw(theData);
});


// DRAWING

function draw(theData) {

    barChartX.rangeRound([0, barChartWidth]);
    barChartY.rangeRound([barChartHeight, 0]);

    g.select(".axis--x")
        .attr("transform", "translate(0," + barChartHeight + ")")
        .call(d3.axisBottom(barChartX));

    g.select(".axis--y")
        .call(d3.axisLeft(barChartY).ticks(10));

    var bars = g.selectAll(".bar")
        .data(theData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return barChartX(d.digits) + (barChartX.bandwidth()/2); })
        .attr("y", function (d) { return barChartY(d.count) ; })
        .attr("width", 1)
        .attr("height", function (d) { return barChartHeight - barChartY(d.count); });

    barChart.selectAll("path.domain").remove();



    // // UPDATE
    // bars.attr("x", function (d) { return barChartX(d.digits); })
    //     .attr("y", function (d) { return barChartY(d.count); })
    //     .attr("width", barChartX.bandwidth())
    //     .attr("height", function (d) { return barChartHeight - barChartY(d.count); });

    // EXIT
    // bars.exit()
    //     .remove();

}

// LOADING DATA




// START!

window.addEventListener("resize", draw);


