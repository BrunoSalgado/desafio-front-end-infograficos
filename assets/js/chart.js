/**
 * Created by Bruno on 05/03/2017.
 */
$(document).ready(function () {
    var data = [
        {'name': 'Carnaval', 'value': 50},
        {'name': 'Férias', 'value': 30},
        {'name': 'Governo', 'value': 75},
        {'name': 'Esporte', 'value': 45},
        {'name': 'Outros', 'value': 25}
    ];
    if ($('.graph-column').length) {
        chart.init(data);
    }
});

var chart = {
    data: [],
    init: function (data) {
        this.data = data;
        this.makeChart();
    },
    makeChart: function () {
        this.sortData();
        this.data.forEach(function (value, key) {
            var className = key == 0 ? 'primary' : '';
            $('.chart').append(
                $('<div></div>')
                    .addClass('column')
                    .addClass(className)
                    .append(
                        $('<label></label>')
                            .text(value.value)
                    )
                    .append(
                        $('<div></div>')
                            .addClass('bar')
                            .css('height', value.value + '%')
                            .append(
                                $('<label></label>')
                                    .text(value.name)
                            )
                    )
            );
        });
    },
    sortData: function () {
        this.data = this.data.sort(function (a, b) {
            if (a.value > b.value) {
                return -1;
            } else if (b.value > a.value) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}