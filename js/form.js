// collection of form JQuery scripts

// dropdown
$(function() {
    var availableDrinks = [
        "Martinique",
        "Mauritius",
        "Peru",
        "Switzerland",
        "Singapore",
        "Kenya",
        "Hawaii"
    ];
    $( "#destination" ).autocomplete({
      source: availableDrinks
    });
});

// select menu
$(function() {
    $( "#comfort").selectmenu({ width : 'auto'});
});

// datepickers
$(function() {
    $( "#start-date").datepicker({ dateFormat: "yy-mm-dd" });
    $( "#end-date").datepicker({ dateFormat: "yy-mm-dd" });
});

// slider
$(function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 6000,
        values: [ 1000, 4000 ],
        create: function( event, ui ) {
        $( "#amount" ).val( "£" + 1000 + " - £" + 4000 );
        },
        slide: function( event, ui ) {
        $( "#amount" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
        }
    });
});

// controlgroup
$(function() {
    $( "#activities" ).controlgroup();
});