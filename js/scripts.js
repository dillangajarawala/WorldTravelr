$(document).ready(function() {
    $('.small-content').on('click', 'a', function(event) {
        event.preventDefault();
        $(event.currentTarget.nextElementSibling).slideToggle();
    });
});

$(document).ready(function() {
    $("#tabs").tabs();
});

function setData() {
    var page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    $.getJSON('resorts.json', function(data) {
        for (var i in data.resorts) {
            if (data.resorts[i].url === page) {
                $('.favorites-toggle').attr('id', data.resorts[i].id);
                $('.intro-content h1').text(data.resorts[i].name);
                $('head title').text(data.resorts[i].name);
                $('.intro-content .fill').attr('src', data.resorts[i].picture);
                $('.small-content .price-jump').text('Starting from just £' + data.resorts[i].price);
                $('.small-content .small-description').text(data.resorts[i].short_description);
                $('.small-content .hidden-info .comfort-lvl').text('Comfort Level: ' + data.resorts[i].comfortLevel);
                $('.small-content .hidden-info .destination').text('Destination: ' + data.resorts[i].destination);
                $('.small-content .hidden-info .location').text('Location: ' + data.resorts[i].location);
                document.getElementById("description").innerHTML=data.resorts[i].long_description;
                var activities = data.resorts[i].activities
                for (var j in activities) {
                    var img = 'images/' + activities[j] + '.jpg';
                    var act = "<tr><td><p>"+activities[j]+"</p></td><td><img class='tabbed-image' src='"+img+"'></td></tr>";
                    $('.small-content .hidden-info table').append(act);
                }
                break;
            }
        }
    });
};

$(document).ready(function() {
    var favResorts = JSON.parse(localStorage.getItem("favResorts"));
    if (favResorts == null) {
        favResorts = []
    }
    var resortId = $('.favorites-toggle').attr('id');
    if (favResorts.includes(resortId)) {
        $('.favorites-toggle').text('Delete From Favorites');
        $('.favorites-toggle').css('background-color', 'red');
        $('.favorites-toggle').attr('data-add', 'false');
    } else {
        $('.favorites-toggle').text('Add To Favorites');
        $('.favorites-toggle').css('background-color', 'lime');
        $('.favorites-toggle').attr('data-add', 'true');
    }
});

$(document).ready(function() {
    $('.favorites-toggle').on('click', function() {
        $(this).attr('disabled', true);
        var favResorts = JSON.parse(localStorage.getItem('favResorts'));
        var toAdd = $(this).attr('data-add');
        var resortId = $(this).attr('id');
        if (toAdd === 'true') {
            if (favResorts === null) {
                favResorts = []
            }
            favResorts.push(resortId);
            localStorage.setItem('favResorts', JSON.stringify(favResorts));
        } else {
            favResorts = favResorts.filter(function(item) {
                return item !== resortId
            });
            localStorage.setItem('favResorts', JSON.stringify(favResorts));
        }
    })
})

$(document).ready(function() {
    $('.search-link').on('click', function(event) {
        var startDate = $('#start-date').datepicker('getDate');
        var endDate = $('#end-date').datepicker('getDate');
        if (startDate === null || endDate === null) {
            event.preventDefault();
            alert("One or more dates are not inputted");
        }
        if (startDate > endDate) {
            event.preventDefault();
            alert("End date cannot be before start date");
        }
        var destination = $('#destination').val();
        var comfort = $('#comfort').val();
        var lowerPrice = parseInt($('#slider-range').slider("values")[0]);
        var higherPrice = parseInt($('#slider-range').slider("values")[1]);
        var activities = []
        $('#activities').children('input').each(function () {
            if ($(this).prop('checked')) {
                activities.push($(this).attr('id').replace('-', ' '));
            }
        });
        localStorage.setItem('destination', destination);
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('endDate', endDate);
        localStorage.setItem('comfort', comfort);
        localStorage.setItem('lowerPrice', lowerPrice);
        localStorage.setItem('higherPrice', higherPrice);
        localStorage.setItem('activities', JSON.stringify(activities));

        $.getJSON('resorts.json', function(data) {
            var results = []
            for (var i in data.resorts) {
                var cond1 = destination.length === 0 || destination === data.resorts[i].destination;
                var cond2 = comfort.length === 0 || comfort === data.resorts[i].comfort;
                var cond3 = data.resorts[i].price >= lowerPrice && data.resorts[i].price <= higherPrice;
                var open = new Date(data.resorts[i].startDate);
                var close = new Date(data.resorts[i].endDate);
                var cond4 = (startDate >= open && endDate <= close);
                var cond5 = activities.every(val => data.resorts[i].activities.includes(val));
                if (cond1 && cond2 && cond3 && cond4 && cond5) {
                    results.push(data.resorts[i].id);
                }
            }
            localStorage.setItem('searchResults', JSON.stringify(results));
        });
    });
});

function loadResults() {
    var results = JSON.parse(localStorage.getItem("searchResults"));
    for (var i in results) {
        alert(results[i]);
    }
}