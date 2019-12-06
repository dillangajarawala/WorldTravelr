$(document).ready(function() {
    $('.small-content').on('click', 'a', function(event) {
        event.preventDefault();
        $(event.currentTarget.nextElementSibling).slideToggle();
    });
});

$(document).ready(function() {
    $("#tabs").tabs();
});
