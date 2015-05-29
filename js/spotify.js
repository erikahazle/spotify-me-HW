// https://api.spotify.com/v1/search?q=SOMETHINGHERE&type=SOMETHINGHERE

var searchKeyword;

function getSearchResult(e) {
  e.preventDefault();
  searchKeyword = $('#search-keyword').val();
  searchType = $('#search-type').val();
  $.ajax({
    type: 'GET',
    url: 'https://api.spotify.com/v1/search?q=' + searchKeyword + '&type=' + searchType
  }).done(function(response){
    results.empty();
    if (searchType === 'album') {
      $.each(response.albums.items, function(index, item) {
        results.append('<li class="result-display"><img src="' + item.images[0].url + '" class="main_cover"><h4>' + item.name + '</h4></li>');
      })
    } else if (searchType === 'artist') {
      $.each(response.artists.items, function(index, item) {
        results.append('<li class="result-display"><img src="' + item.images[0].url + '" class="main_cover"><h4>' + item.name + '</h4></li>');
      })
    } else {
      $.each(response.tracks.items, function(index, item) {
        results.append('<li class="track_display"><img src="' + item.album.images[0].url + '" class="album_cover"><h3 class="audio_title">' + item.name + '</h3><audio controls><source src="' + item.preview_url + '"></audio></li>');   
      })
    }
  })
  $('#search-type').on('change', getSearchResult); 
}

var searchType;
var searchKeyword;
var results;

$(document).ready(function() {
  results = $('#results');
  $('input[type="submit"]').on('click', getSearchResult);
});