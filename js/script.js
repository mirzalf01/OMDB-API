function movieList(){
    $('#movie-list').html('');
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '[your api key]',
            's' : $('#search-input').val()
        },
        success: function(result){
            if(result.Response == "True"){
                let movies = result.Search;
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                    <div class="col-8 col-sm-6 col-md-4 col-lg-3">
                        <div class="card w-100 mb-3" style="height: 500px">
                            <div class="card-header p-0 m-0" style="height: 70%">
                                <img class="card-img-top w-100 h-100" style="object-fit:cover" src="`+data.Poster+`" alt="Card image cap">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">`+((data.Title.length >= 35) ? data.Title.substring(0,30)+" . . ." : data.Title )+`</h5>
                            </div>
                            <div class="card-footer">
                                <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                <a data-id="`+data.imdbID+`" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#" class="see-detail card-link text-decoration-none">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `);
                });
                $('#search-input').val("");
            }
            else{
                $('#movie-list').html('<h1 class="text-center">'+result.Error+'</h1>');
            }
        }
    });
}
$('#search-button').on('click', function(){
    movieList();
});
$('#search-input').on('keyup', function(e){
    if (e.keyCode === 13) {
        movieList();
    }
});
$('#movie-list').on('click','.see-detail', function () {
    $.ajax({
        type: "get",
        url: "http://www.omdbapi.com",
        data: {
            'apikey' : '[your api key]',
            'i' : $(this).data('id')
        },
        dataType: "JSON",
        success: function (response) {
            if (response.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4 mb-3 d-flex">
                                <img class="img-fluid mx-auto" src="`+response.Poster+`">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+response.Title+`</h3></li>
                                    <li class="list-group-item">`+response.Released+`</li>
                                    <li class="list-group-item">`+response.Genre+`</li>
                                    <li class="list-group-item">`+response.Director+`</li>
                                    <li class="list-group-item">`+response.Actors+`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});