var currentMovie = {}
var showForm = false

$(document).ready( function() {
    $(document).on('click', '.movie-item', function() {
        currentMovie.id = this.dataset.id
        currentMovie.name = this.dataset.name
        $.ajax({
            url: '/movies/' + currentMovie.id + '/actors',
            method: 'GET',
            dataType: 'JSON'
        }).done( function(actors) {
            var list = $('#actors')
            list.empty()
            actors.forEach( function(act) {
                $('#movie').text('Actors in ' + currentMovie.name)
                var li = '<li data-actor-id="' + act.id + '">' + act.name + '</li>'
                list.append(li)
            })
        })
    })

    function toggle() {
        showForm =! showForm
        $('#movie-form').remove()
        $('#movies-list').toggle()

        if (showForm) {
            $.ajax({
                url: '/movie_form',
                method: 'GET'
            }).done( function(html) {
                $('#toggle').after(html)
            })
        }
    }

    $('#toggle').on('click', function() {
        toggle()
    })

    $(document).on('submit', '#movie-form form', function(e) {
        e.preventDefault()
        var data = $(this).serializeArray()
        $.ajax({
            url: '/movies',
            type: 'POST',
            dataType: 'JSON',
            data: data
        }).done( function(movie) {
            var g = '<li class="movie-item" data-id="' + movie.id + '" data-name="' + movie.name + '">' + movie.name + ' - ' + movie.description + '</li>'
            $('#movies-list').append(g)
            toggle()
        }).fail( function(err) {
            alert(err.responseJSON.errors)
        })
    })

})