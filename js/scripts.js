$(document).ready(function() {
    $('.small-content').on('click', 'a', function(event) {
        event.preventDefault();
        $(event.currentTarget.nextElementSibling).slideToggle();
    });
});

$(document).ready(function() {
    $("#tabs").tabs();
});

$(document).ready(function() {
    var page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    $.getJSON('resorts.json', function(data) {
        for (var i in data.resorts) {
            if (data.resorts[i].url === page) {
                $('.intro-content h1').text(data.resorts[i].name);
                $('head title').text(data.resorts[i].name);
                $('.intro-content .fill').attr('src', data.resorts[i].picture);
                $('.small-content .price-jump').text('Starting from just $' + data.resorts[i].price);
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
});
