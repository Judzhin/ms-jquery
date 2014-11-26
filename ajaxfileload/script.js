/**
 * @author Judzhin Miles info[woof-woof]msbios.com
 */
$(function () {
    $('input[type=file]').on('change', function () {

        var data = new FormData();

        $.each(event.target.files, function (key, value) {
            data.append(key, value);
        });

        $.ajax({
            url: 'submit.php?files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function (data, textStatus, jqXHR) {
                if (typeof data.error === 'undefined') {


                    $("<div class='image'><img width='200px' src='" + data['files'][0] + "'></div>").appendTo("#images");

                    console.log(["data", data]);
                    // Success so call function to process the form
                    // submitForm(event, data);
                } else {
                    // Handle errors here
                    console.log('ERRORS: ' + data.error);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Handle errors here
                console.log('ERRORS: ' + textStatus);
                // STOP LOADING SPINNER
            }
        });
    });

});