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
    $('.favorites-toggle').attr('id', data.id);
    $('.intro-content h1').text(data.name);
    $('head title').text(data.name);
    $('.intro-content .fill').attr('src', data.picture);
    $('.small-content .price-jump').text('Starting from just £' + data.price);
    $('.small-content .small-description').text(data.short_description);
    $('.small-content .hidden-info .comfort-lvl').text('Comfort Level: ' + data.comfortLevel);
    $('.small-content .hidden-info .destination').text('Destination: ' + data.destination);
    $('.small-content .hidden-info .location').text('Location: ' + data.location);
    document.getElementById("description").innerHTML=data.long_description;
    var activities = data.activities
    for (var j in activities) {
        var img = 'images/' + activities[j] + '.jpg';
        var act = "<tr><td><p>"+activities[j]+"</p></td><td><img class='tabbed-image' src='"+img+"'></td></tr>";
        $('.small-content .hidden-info table').append(act);
    }
};

function addFavoriteDisplay(resortId) {
        for (var i in resorts) {
            if (resortId === resorts[i].id) {
                var item = `<div class="resort-small" data-id='`+resorts[i].id+`'>
                <a href='`+resorts[i].url+`' title='`+resorts[i].short_description+`'><img class='resort-small-img' src='`+resorts[i].picture+`'></a>
                    <h2>`+resorts[i].name+`</h2>Starting from £`+resorts[i].price+`<br><br>
                </div>
            <br>`;
            $('#favorites-list').append(item);
            }
        }
}

function setButtonAttrs(button, msg, color, toAdd) {
    $(button).text(msg);
    $(button).css('background-color', color);
    $(button).attr('data-add', toAdd);
}

$(document).ready(function() {
    var favResorts = JSON.parse(localStorage.getItem("favResorts"));
    if (favResorts == null) {
        favResorts = []
    }
    $('.favorites-toggle').each(function() {
        if (favResorts.includes($(this).attr('id'))) {
            setButtonAttrs(this, 'Delete From Favorites', 'red', 'false');
        } else {
            setButtonAttrs(this, 'Add To Favorites', 'lime', 'true');
        }
    }); 
});

$(document).ready(function() {
    $('.favorites-toggle').on('click', function(event) {
        event.preventDefault();
        var favResorts = JSON.parse(localStorage.getItem('favResorts'));
        var toAdd = $(this).attr('data-add');
        var resortId = $(this).attr('id');
        if (toAdd === 'true') {
            if (favResorts === null) {
                favResorts = []
            }
            favResorts.push(resortId);
            setButtonAttrs(this, 'Delete From Favorites', 'red', 'false');
            localStorage.setItem('favResorts', JSON.stringify(favResorts));
            if ($(this).attr('class') === 'favorites-toggle small') {
                addFavoriteDisplay(resortId);
            }
        } else {
            favResorts = favResorts.filter(function(item) {
                return item !== resortId
            });
            setButtonAttrs(this, 'Add To Favorites', 'lime', 'true');
            localStorage.setItem('favResorts', JSON.stringify(favResorts));
            if ($(this).attr('class') === 'favorites-toggle small') {
                $('#favorites-list').children().each(function() {
                    if ($(this).attr('data-id') === resortId) {
                        $(this).remove();
                    }
                });
            }
        }
    });
});

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

        var results = []
        for (var i in resorts) {
            var cond1 = destination.length === 0 || destination === resorts[i].destination;
            var cond2 = comfort.length === 0 || comfort === resorts[i].comfort;
            var cond3 = resorts[i].price >= lowerPrice && resorts[i].price <= higherPrice;
            var open = new Date(resorts[i].startDate);
            var close = new Date(resorts[i].endDate);
            var cond4 = (startDate >= open && endDate <= close);
            var cond5 = activities.every(val => resorts[i].activities.includes(val));
            if (cond1 && cond2 && cond3 && cond4 && cond5) {
                results.push(resorts[i].id);
            }
        }
        localStorage.setItem('searchResults', JSON.stringify(results));
    });
});

function showResults() {
    var results = JSON.parse(localStorage.getItem("searchResults"));
    for (var i in resorts) {
        if (results.includes(resorts[i].id)) {
            var item = `<div class="resort-small">
            <a href='`+resorts[i].url+`' title='`+resorts[i].short_description+`'><img class='resort-small-img' src='`+resorts[i].picture+`'></a>
                <h2>`+resorts[i].name+`</h2>Starting from £`+resorts[i].price+`<br><br>
                <a href='#'><button id='`+resorts[i].id+`' class="favorites-toggle small"></button></a><br><br>
            </div>
        <br>`;
        $('#search-results').append(item);
        }
    }
}

function showFavorites() {
    var favs = JSON.parse(localStorage.getItem("favResorts"));
    for (var i in resorts) {
        if (favs.includes(resorts[i].id)) {
            var item = `<div class="resort-small" data-id='`+resorts[i].id+`'>
            <a href='`+resorts[i].url+`' title='`+resorts[i].short_description+`'><img class='resort-small-img' src='`+resorts[i].picture+`'></a>
                <h2>`+resorts[i].name+`</h2>Starting from £`+resorts[i].price+`<br><br>
            </div>
        <br>`;
        $('#favorites-list').append(item);
        }
    }
    if (favs.length > 0) {
        var clear = `<button id='favorites-clear'>Clear Favorites List</button>
        <br><br>`;
        $('#favorites-list').append(clear);
    }
}

$(document).ready(function() {
    $('#favorites-clear').on('click', function() {
        $('#favorites-list').children().not('h3').remove();
        localStorage.setItem("favResorts", JSON.stringify([]));
        $('.favorites-toggle').each(function() {
            setButtonAttrs(this, 'Add To Favorites', 'lime', 'true');
        })
    });
});