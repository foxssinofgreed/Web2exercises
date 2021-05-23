// section one, creating searchable categories

var categories = [];

$(document).ready(function () {


        const request_one = {
            "url": "https://gorest.co.in/public-api/categories",
            "method": "GET"
        };

        $.ajax(request_one).done(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                categories.push(response.data[i].name);
            }

        });
});

$(function (){

    console.log(categories); // this would represent categories by name
    $("#search").autocomplete({source: categories}); // for now it's only searchable by input, but it's autocomplete and will suggest every category on typing

})

// here code will go after choosing category and clicking enter (no button for now)

$(document).on('keypress', function(e) {
    if(e.which === 13) {
        var input = $('#search').val();

        const request_two = {
            "url": "https://gorest.co.in/public-api/categories",
            "method": "GET"
        };

        $.ajax(request_two).done(function (response) {

            var show = false;

            for (var i = 0; i < response.data.length; i++) {

                if (input === response.data[i].name) {
                    show = true;
                }
                if (show) {
                    /*element.style.display = "";*/

                    const request_three = {
                        "url": "https://gorest.co.in/public-api/products?categories[]=" + response.data[i].id,
                        "method": "GET"
                    };

                    $.ajax(request_three).done(function (response_1) {

                        console.log(response_1.data);

                        /*for (var i = 0; i < response_1.data.length; i++) {
                            categories.push(response_1.data[i].name);
                        }*/

                    });



                    show = false;
                } else {
                    /*element.style.display = "none";*/
                    console.log('none');
                }
            }

        });


    }
});