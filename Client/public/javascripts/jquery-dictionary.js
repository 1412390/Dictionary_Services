$(document).ready(function () {

    $('a.nav-link').on('click', function () {

        $('a.nav-link').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
    });

    $('#form-dictionary').on('submit', function () {
        var word =  $('#txt-word').val().trim();
        var type = $('a.nav-link.active').data('type');
        if(word.length === 0){
            return false;
        }

        $.ajax({
            url: 'http://localhost:3000/dictionary',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                word: word.toLowerCase(),
                type: type
            }),
            success: function(data) {

                var success = data.success;
                if(success){
                    var result = data.result;
                    $('#span_word').html('Word: ' + word);
                    $('#span_mean').html('Mean: ' + result);
                }
                else
                {
                    $('#span_word').html('Word: ' + word);
                    $('#span_mean').html('Mean: ');

                }
            },
            error: function (error) {
                console.log(error + "");
            }
        });

        return false;
    });

});