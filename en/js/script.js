/**
 * Created by yevheniia on 24.01.19.
 */

const stepHeight = window.innerHeight / 2;
d3.selectAll('.step')
    .style('height', `${stepHeight}px`);


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
            "text": "The diagonal pairs such as 2828",
            "textOffset": [
                -132,
                43
            ]
        },

        {
            "x": 55,
            "y": 55,
            "path": "M-242,54C-168,-22,-100,-14,-44,3",
            "text": "“Three some in a row” such as 5550, 5551",
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
            "text": "The least filled corridors are the numbers containing “6”",
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

var margin = {top: 30, right: 30, bottom: 30, left: 30};

var viewBox = $("#mychart")[0].getAttribute("viewBox").split(" "),
    size = viewBox.slice(2);
    var width = size[0];
    var height = size[1];    

var svg = d3.select("svg#mychart");

var group = svg.append("g").attr("transform",
        "translate(" + 30 + "," + 0 + ")");

width = 1 * width - margin.left - margin.right;
height = 1 * height - margin.top - margin.bottom;


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
    .call(d3.axisBottom(x));

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

// var colourScale = d3.scaleLinear()
//     .domain([0, 2000])
//     // .range(['white','crimson']);
//     .range(['white', "#f582e9"]);

var colourScale = d3.scalePow()
    .domain([0, 2000])
    .exponent(0.7)
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

step_00();


var swoopySel1 = group.append('g')
    .attr("class", "swoopy-1")
    .call(swoopy1);
// swoopySel1.selectAll('path').attr('marker-end', 'url(#arrow)');


var swoopySel2 = group.append('g')
    .attr("class", "swoopy-2")
    .call(swoopy2);

// swoopySel2.selectAll('path').attr('marker-end', 'url(#arrow)')

var swoopySel3 = group.append('g')
    .attr("class", "swoopy-3")
    .call(swoopy3);

// swoopySel3.selectAll('path').attr('marker-end', 'url(#arrow)')


var ticks = d3.selectAll(".tick text");
ticks.attr("class", function(d,i){
    if(i%10 != 0) d3.select(this).remove();
});




function step_00(){
    sessionStorage.loaded = true;
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


    tippy('.car-number', {
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
            var tooltip = $('rect#d' + thisId).attr("value");
            tooltip = tooltip + " registration plates";
            $(this).css("background-color", bgcolor);
            $(this).attr("data-tippy-content", tooltip);
        })

        },1000);

    });


}





function databind(data) {
    /*
     var colour_scale = d3.scaleLinear()
     .domain(d3.extent(data, function(d) { return d.alpha; }))
     .range(['white','crimson'])
     */
    // data = data.filter(d => +d.x < 30 && +d.y < 30);
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
        .style('fill', function(d) {
            return colourScale(d.alpha); });
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
        d3.select(this).attr("data-tippy-content", d.digits).attr("id", k).attr("value", d.count)
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
    var stepHeight = Math.floor(window.innerHeight * 0.5);
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
        $(".swoopy-1").find("path").each(function(d){
            $(this).attr("class", "");
        });
        swoopySel1.selectAll('path').attr('marker-end', '');
        $(".swoopy-1").css("display", "none");
        $(".swoopy-2").css("display", "none");
        $(".swoopy-3").css("display", "none");
    }


    if(r.index === 2 && r.direction === "down"){
        $(".swoopy-1").find("path").each(function(d){
            $(this).attr("class", "pathAnimateTo")
        });
        setTimeout(function(){
            swoopySel1.selectAll('path').attr('marker-end', 'url(#arrow)');
        }, 500);
        $(".swoopy-1").css("display", "block")
    }

    if(r.index === 2 && r.direction === "up"){
        $(".swoopy-1").css("display", "block");
        $(".swoopy-2").find("path").each(function(d){
            $(this).attr("class", "");
        });
        swoopySel2.selectAll('path').attr('marker-end', '');
        $(".swoopy-2").css("display", "none");
        $(".swoopy-3").css("display", "none");
    }



    if(r.index === 3 && r.direction === "down"){
        $(".swoopy-2").find("path").each(function(d){
            $(this).attr("class", "pathAnimateTo")
        });
        setTimeout(function(){
            swoopySel2.selectAll('path').attr('marker-end', 'url(#arrow)');
        }, 500);

        $(".swoopy-2").css("display", "block")
    }


    if(r.index === 3 && r.direction === "up"){
        $(".swoopy-2").css("display", "block");
        $(".swoopy-1").css("display", "block");
        $(".swoopy-3").find("path").each(function(d){
            $(this).attr("class", "");
        });
        swoopySel3.selectAll('path').attr('marker-end', '');
        $(".swoopy-3").css("display", "none");

    }


    if(r.index === 4 && r.direction === "down"){
        $(".swoopy-3").find("path").each(function(d){
            $(this).attr("class", "pathAnimateTo")
        });
        setTimeout(function(){
            swoopySel3.selectAll('path').attr('marker-end', 'url(#arrow)');
        }, 1500);

        $(".swoopy-3").css("display", "block")
    }

    $(document).ready(function() {
        if (sessionStorage.loaded === true && r.index != 1) {
            step_01();
        }
    });

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



//desktop form
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

    if (n1 === "" || isNaN(n1)) { n1 = "," }
    if (n2 === "" || isNaN(n2)) { n2 = "," }
    if (n3 === "" || isNaN(n3)) { n3 = "," }
    if (n4 === "" || isNaN(n4)) { n4 = "," }

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
        var numbers = allNumbers.filter(function (n) { return (n.digits.toString()).match(regexp);   });
        var sumArray = numbers.map(function (n){ return parseInt(n.count) });
        var sum = sumArray.reduce(function(x, y) { return x + y });
        $("#inputResult").html(sum)
    });
}
});

//mobile form

String.prototype.replaceAll = function(character,replaceChar){
    var word = this.valueOf();

    while(word.indexOf(character) != -1)
        word = word.replace(character,replaceChar);

    return word;
};



/* Гралка для моб.версії*/

var tangle = new Tangle (document.getElementById("calculator"), {
    initialize: function () {
        this.n1 = -1; this.n2 = -1; this.n3 = -1; this.n4 = -1;
    }, update: function () {
        var m1 = this.n1, m2 = this.n2, m3 = this.n3, m4 = this.n4;

    if (this.n1 === -1) { m1 = "," }
    if (this.n2 === -1) { m2 = "," }
    if (this.n3 === -1) { m3 = "," }
    if (this.n4 === -1) { m4 = "," }

    var n = "^" + m1 + m2 + m3 + m4;
    n = n.replaceAll(",", "[0-9]");
    var regexp = new RegExp(n);

//якщо немає жодної цифри:
    if(n === "^[0-9][0-9][0-9][0-9]"){
        this.result = ""
    }
//якщо є:
    var sum;
    if(n != "^[0-9][0-9][0-9][0-9]"){

        retrieve_chart_data(function(allNumbers){
            var numbers = allNumbers.filter(function (n) {
                return (n.digits.toString()).match(regexp);
            });
            var sumArray = numbers.map(function (n){
                return parseInt(n.count)
            });
            sum = sumArray.reduce(function(x, y) {
                return x + y
            });
        });
            this.result = sum + " авто"
    }
    }
});

jQuery(function() {
    var getWindow = jQuery(window);
    var windowHeight = getWindow.height();
    jQuery(window).scroll(function(){
        if(jQuery(window).scrollTop() > windowHeight ){
            jQuery("#translate").css("display", "none");
        } else {
            jQuery("#translate").css("display", "flex");
        }

    });
});









