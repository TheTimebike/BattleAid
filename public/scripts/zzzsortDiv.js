function sortDiv() {
    $("#insertCards div").sort(function(a, b) {
        return parseInt(a.id) - parseInt(b.id);
    }).each(function() {
        var elem = $(this);
        elem.remove();
        $(elem).appendTo("#insertCards");
    });
}