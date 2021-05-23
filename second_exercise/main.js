var categories = [];

$(document).ready(function () {


        const request_one = {
            "url": "https://gorest.co.in/public-api/categories",
            "method": "GET"
        };

        $.ajax(request_one).done(function (response) {

            var filter = 'Jewelry';
            var show;
            filter = filter.toUpperCase();

            for (var i = 0; i < response.data.length; i++) {
                categories.push(response.data[i].name);
                if (response.data[i].name.toUpperCase().indexOf(filter) > -1) {
                    show = true;
                }
                if (show) {
                    /*element.style.display = "";*/
                    show = false;
                } else {
                    /*element.style.display = "none";*/
                    console.log('none');
                }
            }
        });


});

$(function (){
    console.log(categories);
    $("#search").autocomplete({source: categories});
})