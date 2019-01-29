/**
 * Created by yevheniia on 29.01.19.
 */
d3.csv("data/table_data.csv", function (error, tableData) {
    if (error) throw error;

    tableData.forEach(function (d) {
        d.index = +d.index;

    })


    var sortAscending = true;

    var table = d3.select('table#table');

// Append the table header and body.
    var tableHead = table.append('thead'),
        tableBody = table.append('tbody');

// Add the table header content.
    tableHead.append('tr').selectAll('th')
        .data(["марка", "різниця, рази", "із звичайними номерами", "із «модними» номерами"]).enter()
        .append('th')
        .text(function (d) {
            return d;
        });

// Add the table body rows.
    var rows = tableBody.selectAll('tr')
            .data(tableData)
            .enter()
            .append('tr');


    rows.append('td')
        .attr("id", function (d) {
            return d.id
        })
        .text(function (d) {
            return d.auto;
        });


    rows.append('td')
        .text(function (d) {
            return d.index;
        });

    rows.append('td')
        .text(function (d) {
            return d.ordinal;
        });

    rows.append('td')
        .text(function (d) {
            return d.nonordinal;
        });


    table.selectAll("tbody tr")
        .sort(function (a, b) {
            return d3.descending(a.index, b.index)

        });
});