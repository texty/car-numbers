/**
 * Created by yevheniia on 25.01.19.
 */

var barChart = d3.select("svg#barChart"),
    barChartmargin = { top: 30, right: 20, bottom: 60, left: 40 },
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
        .call(d3.axisBottom(barChartX))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    g.select(".axis--y")
        .call(d3.axisLeft(barChartY).ticks(10));

    var bars = g.selectAll(".bar")
        .data(theData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return barChartX(d.digits) + (barChartX.bandwidth()/2); })
        // .attr("x", function (d) { return barChartX(d.digits) })
        .attr("y", function (d) { return barChartY(d.count) ; })
        .attr("width", 1)
        .attr("height", function (d) { return barChartHeight - barChartY(d.count); });

    barChart.selectAll("path.domain").remove();
    barChart.selectAll("#barChart .axis--x .tick line").remove();


    g.append("rect")
        .attr("id", "x-axis-label-bg")
        .attr("fill", "rgb(253, 225, 250)");


    g.append("rect")
        .attr("id", "y-axis-label-bg")
        .attr("fill", "rgb(253, 225, 250)");


    g.append("text")
        .attr("x", 0)
        .attr("y", 0 - 40)
        .attr("dy", "2.2em")
        .attr("text-anchor", "end")
        .text("Quantity")
        .style("font-size", "11px")
        .style("font-style", "italic")
    ;


    g.append("text")
        .attr("x", barChartWidth - barChartmargin.right )
        .attr("y", barChartY(500))
        .attr("id", "x-axis-label")
        .attr("dy", "2.2em")
        .attr("text-anchor", "end")
        .text("Plate Number")
        .style("font-size", "11px")
        .style("font-style", "italic")
    ;


    // .attr("transform", "rotate(-90)")



    var paddingLeftRight = 3; // adjust the padding values depending on font and font size
    var paddingTopBottom = 1;

    var bb;

    barChart.selectAll("#x-axis-label").each(function(d){
    bb = this.getBBox();
});


    barChart.selectAll("rect#x-axis-label-bg")
        .attr("x", barChartWidth - (barChartmargin.right + bb.width))
        .attr("y", barChartY(500) + bb.height)
        .attr("width", function(d) { return bb.width + paddingLeftRight; })
        .attr("height", function(d) { return bb.height + paddingTopBottom; })
        .style("z-index", 10000)
    ;

    barChart.selectAll("rect#y-axis-label-bg")
        .attr("x", 0 - bb.width)
        .attr("y", 0 - 25)
        .attr("width", function(d) { return bb.width + paddingLeftRight; })
        .attr("height", function(d) { return bb.height + paddingTopBottom; })
        .style("z-index", 10000)
    ;

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


