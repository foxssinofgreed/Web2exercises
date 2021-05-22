$(document).ready(function () {

    const request_one = {
        "url": "https://gorest.co.in/public-api/categories",
        "method": "GET",
        "headers": {}
    };
    $.ajax(request_one).done(function (response) {
        var data = response.data;
        var length = response.data.length;
        for(var i = 0; i < length; i++){
            console.log(data[i].name);
        }

        var txtValue, input, filter;
        input = $('#searchVal');
        filter = input.value.toUpperCase();


        txtValue = span.textContent || searchVal().innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            show = true;
        }
    });


});
