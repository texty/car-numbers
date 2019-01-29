/**
 * Created by yevheniia on 24.01.19.
 */

var chart_data;
function retrieve_chart_data(cb) {
    if (chart_data) return cb(chart_data);

    return d3.csv("./data/chart_data_1.csv", function(err, myData){
        if (err) throw err;

        chart_data = myData;
        if (cb) return cb(myData);
        return;
    })
}

var annotations =
    [
        {
            "x": 20,
            "y": 20,
            "path": "M546,7L484,110",
            "text": "0777 (№4)",
            "textOffset": [
                537,
                -5
            ]
        },
        {
            "x": 50,
            "y": 50,
            "path": "M319,-174C308,-171,261,-166,232,-219",
            "text": "7777 (№1)",
            "textOffset": [
                320,
                -167
            ]
        },

        {
            "x": 55,
            "y": 55,
            "path": "M-322,402C-341,407,-368,402,-445,462",
            "text": "0001 (№2)",
            "textOffset": [
                -318,
                403
            ]
        },
        {
            "x": 30,
            "y": 30,
            "path": "M318,-534C408,-554,444,-529,484,-483",
            "text": "8888 (№3)",
            "textOffset": [
                234,
                -529
            ]
        }
    ];

var annotations2 =
    [
        {
            "x": 30,
            "y": 50,
            "path": "M-32,57C-91,87,-136,78,-174,23",
            "text": "пари на діагоналі, напр. 2828",
            "textOffset": [
                -132,
                43
            ]
        },

        {
            "x": 55,
            "y": 55,
            "path": "M-242,54C-168,-22,-100,-14,-44,3",
            "text": "трійки, напр. 5550, 5551",
            "textOffset": [
                -374,
                72
            ]
        }
    ];


var annotations3 =
    [
        {
            "x": 50,
            "y": 30,
            "path": "M-16,-118C-124,-118,-155,-118,-226,-118",
            "text": "пустий коридор - номери з шістками",
            "textOffset": [
                4,
                -114
            ]
        },

        {
            "x": 40,
            "y": 40,
            "path": "M221,-186C224,47,222,24,226,239",
            "text": "",
            "textOffset": [
                320,
                -167
            ]
        }


    ];



var collection;



// d3.select('.on_click')
//     .on('click', function(){ step_01(); })


var margin = {top: 30, right: 30, bottom: 30, left: 30};

var viewBox = $("#mychart")[0].getAttribute("viewBox").split(" "),
    size = viewBox.slice(2),
    width = size[0],
    height = size[1],
    aspect = width / height;

// append the svg object to the body of the page

var svg = d3.select("svg#mychart");

var group = svg.append("g").attr("transform",
        "translate(" + 30 + "," + 0 + ")");
// ww = +svg.attr("width"),
// hh = +svg.attr("height"),
width = 1 * width - margin.left - margin.right;
height = 1 * height - margin.top - margin.bottom;
// var svg = d3.select(".chart")
//     .append("svg")
//     .attr("viewBox", "0 0 800 800")
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     // .attr("width", width + margin.left + margin.right)
//     // .attr("height", height + margin.top + margin.bottom)

// group.append("g")
//     .attr("transform",
//         "translate(" +0 + "," + 0 + ")");

// Labels of row and columns
var myGroups = [...Array(100).keys()].map((e) => {e = '' + e; return e.length == 1 ? '0' + e : e;} )
var myVars = myGroups;

// Build X scales and axis:
var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.02);

group.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

// Build X scales and axis:
var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.02);

svg.append("g")
    .attr("transform", "translate(30,0)")
    .call(d3.axisLeft(y));


group.append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '-10 -10 20 20')
    .attr('markerWidth', 20)
    .attr('markerHeight', 20)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M-6.75,-6.75 L 0,0 L -6.75,6.75')

var colourScale = d3.scaleLinear()
    .domain([0, 2000])
    // .range(['white','crimson']);
    .range(['white', "#f582e9"]);

var swoopy1 = d3.swoopyDrag()
        .x(d => x(d.y))
.y(d => y(d.x))
.draggable(false)
    .annotations(annotations);


var swoopy2 = d3.swoopyDrag()
        .x(d => x(d.y))
.y(d => y(d.x))
.draggable(false)
    .annotations(annotations2);

var swoopy3 = d3.swoopyDrag()
        .x(d => x(d.y))
.y(d => y(d.x))
.draggable(false)
    .annotations(annotations3);





// var swoopy2 = d3.swoopyDrag()
//         .x(d => x(d.y))
// .y(d => y(d.x))
// .draggable(true)
//     .annotations(annotations3);

step_00();


var swoopySel1 = group.append('g')
    .attr("class", "swoopy-1")
    .call(swoopy1);
swoopySel1.selectAll('path').attr('marker-end', 'url(#arrow)');


var swoopySel2 = group.append('g')
    .attr("class", "swoopy-2")
    .call(swoopy2);

swoopySel2.selectAll('path').attr('marker-end', 'url(#arrow)')

var swoopySel3 = group.append('g')
    .attr("class", "swoopy-3")
    .call(swoopy3);

swoopySel3.selectAll('path').attr('marker-end', 'url(#arrow)')


var ticks = d3.selectAll(".tick text");
ticks.attr("class", function(d,i){
    if(i%10 != 0) d3.select(this).remove();
});






// $(".tippy-popper").attr("opacity", 0);

// setTimeout(step_01, 2000);
//
// setTimeout(step_00, 7000);




function step_00(){
    databind(generate_random());

}


function generate_random(){
    var random = [];
    var l = 0;
    for(var i = 0; i < 100; i++){
        for(var j = 0; j < 100; j++){
            var v = ~~(500 * Math.random());
            v = v < 250 ? v = 0: v;
            random[l++] = {x:i+'', y:j+'', alpha: v};
        }
    }
    return random;
}


var dta;



function step_01(){

    collection = tippy('.plate_digits', {
        hideOnClick: true,
        theme: 'tomato',
        delay: 0,
        animateFill: true,
        // arrow: true,
        // inertia: false,
        size: 'small',
        duration: 0,
        allowHTML: true,
        trigger: "mouseenter",
        interactive: false,
        onShow(tip) {
            tip.setContent(tip.reference.getAttribute('data-tippy-content'))
        }
    });

    //



    retrieve_chart_data(function(myData){
        databind(myData);

        setTimeout(function(){
        $("span.car-number").each(function(d){
            var thisId = $(this).text();
            var bgcolor = $('rect#d' + thisId).css('fill');
            $(this).css("background-color", bgcolor);
        })

        },1000);

    });

        // d3.csv("./data/chart_data_1.csv", function(data) {
    //     databind(data);
    // })





}





function databind(data) {
    /*
     var colour_scale = d3.scaleLinear()
     .domain(d3.extent(data, function(d) { return d.alpha; }))
     .range(['white','crimson'])
     */
    var join = group.selectAll('rect.plate_digits')
            .data(data, (d) => {return d.x+"|"+d.y} );

    var enterSel = join
        .enter()
        .append("rect")
        .attr("x", function(d) { var e = d.x; var xvar = e.length == 1 ? '0' + e : e; return x(xvar) })
        .attr("y", function(d) { var e = d.y; var yvar = e.length == 1 ? '0' + e : e; return y(yvar) })
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        // .attr("data-tippy-content", function(d) {
        //     return  d.y + d.x;
        // })
        .style("fill", function(d) { return colourScale(d.alpha)} )
        .attr("class", "plate_digits");


    join
    //.merge(enterSel)
        .transition()
        .duration(1000)
        //.attr('width', 40)
        //.attr('height', 40)
        .style('fill', function(d) { return colourScale(d.alpha); });
    //.attr('fillStyle', "#bebebe");

    var exitSel = join.exit()
        .transition()
        .duration(1000)
        //.attr('width', 0)
        //.attr('height', 0)
        .attr('fill', 'white')
        .remove();

    d3.selectAll(".plate_digits").each(function(d){
       var k = "d" + d.digits;
        d3.select(this).attr("data-tippy-content", d.digits).attr("id", k)
    });

}


d3.selectAll(".plate_digits").on("click", function(d){
    console.log(d)
});




var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('.chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();



// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepHeight = Math.floor(window.innerHeight * 0.75);
    step.style('height', stepHeight + 'px');

    // 2. update width/height of graphic element
    var bodyWidth = d3.select('body').node().offsetWidth;
    var textWidth = text.node().offsetWidth;

    var graphicWidth = bodyWidth - textWidth;

    graphic
        .style('width', graphicWidth + 'px')
        .style('height', window.innerHeight + 'px');

    var chartMargin = 32;
    var chartWidth = graphic.node().offsetWidth - chartMargin;

    chart
        .style('width', chartWidth + 'px')
        .style('height', Math.floor(window.innerHeight / 2) + 'px');


    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(r) {



    if(r.index === 0 && r.direction === "up"){
        step_00();
        collection.destroyAll();


        $(".swoopy-1").css("display", "none");
        $(".swoopy-2").css("display", "none");
        $(".swoopy-3").css("display", "none");
        $(".tippy-popper").css("opacity", 0)
    }


    if(r.index === 1 && r.direction === "down") {
        step_01();

    }

    if(r.index === 1 && r.direction === "up"){
        $(".swoopy-1").css("display", "none");
        $(".swoopy-2").css("display", "none");
        $(".swoopy-3").css("display", "none");
    }


    if(r.index === 2 && r.direction === "down"){
        $(".swoopy-1").css("display", "block")
    }

    if(r.index === 2 && r.direction === "up"){
        $(".swoopy-1").css("display", "block");
        $(".swoopy-2").css("display", "none");
        $(".swoopy-3").css("display", "none");
    }



    if(r.index === 3 && r.direction === "down"){
        $(".swoopy-2").css("display", "block")
    }


    if(r.index === 3 && r.direction === "up"){
        $(".swoopy-2").css("display", "block");
        $(".swoopy-1").css("display", "block");
        $(".swoopy-3").css("display", "none");

    }


    if(r.index === 4 && r.direction === "down"){
        $(".swoopy-3").css("display", "block")
    }

}

function handleContainerEnter(response) {
    // response = { direction }
}

function handleContainerExit(response) {
    // response = { direction }
}


function init() {
    handleResize();
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        offset: 0.9,
        debug: false,
    })
        .onStepEnter(handleStepEnter)
        .onContainerEnter(handleContainerEnter)
        .onContainerExit(handleContainerExit);

    window.addEventListener('resize', handleResize);
}

init();




$('.number-input').on('input', function() {
    var sanitized = $(this).val().replace(/[^0-9]/g, '');
    $(this).val(sanitized);
    var myLength = $(this).val().trim().length;
    if(myLength == 1 ){
        $(this).next('.number-input').focus();
    }

    var n1 = $("#n-1").val();
    var n2 = $("#n-2").val();
    var n3 = $("#n-3").val();
    var n4 = $("#n-4").val();

    if (n1 === "" || isNaN(n1)) {
        n1 = ","
    }
    if (n2 === ""  || isNaN(n2)) {
        n2 = ","
    }
    if (n3 === "" || isNaN(n3)) {
        n3 = ","
    }
    if (n4 === ""  || isNaN(n4)) {
        n4 = ","
    }

    var n = "^" + n1 + n2 + n3 + n4;
    n = n.replaceAll(",", "[0-9]");
    var regexp = new RegExp(n);

//якщо немає жодної цифри
    if(n === "^[0-9][0-9][0-9][0-9]"){
        $("#inputResult").html("")
    }

//якщо є хоч щось
    if(n != "^[0-9][0-9][0-9][0-9]"){
    retrieve_chart_data(function(allNumbers){

        var numbers = allNumbers.filter(function (n) {
                return (n.digits.toString()).match(regexp);
        });

        var sumArray = numbers.map(function (n){
            return parseInt(n.count)
        });

        var sum = sumArray.reduce(function(x, y) {
           return x + y
        });

            $("#inputResult").html(sum)
    });
}

});



String.prototype.replaceAll = function(character,replaceChar){
    var word = this.valueOf();

    while(word.indexOf(character) != -1)
        word = word.replace(character,replaceChar);

    return word;
};






// $('[id="'+str+'"]')[0]