$(document).ready(function() {

  $('body').vegas({
    slides: [{
      src: ''
    }],
    animation: 'kenburns',
    overlay: 'http://oss.maxcdn.com/jquery.vegas/1.3.4/overlays/05.png'
  });

  $('.ui.modal').modal('attach events', 'button#about', 'show');

  $.getJSON('https://api.myjson.com/bins/1b9te', function(data) {
    var current = {};
    var changeContent = function() {
      var rndMovie = data[Math.floor(data.length * Math.random())];
      current.movie = rndMovie.tmdbid;
      current.quote = rndMovie.quotes[Math.floor(rndMovie.quotes.length * Math.random())];
      var rndQuote = current.quote.split('\n').map(function(line) {
        return line.replace(/^([^:]*):/gm, '<strong>$1:</strong>')
      }).join('<br>');

      $('.result').empty().append([
        '<h1>',
        rndQuote,
        '</h1>',
        '<div id="title"><h3><a href=\"https://www.themoviedb.org/movie/',
        rndMovie.tmdbid,
        '\" target=\"_blank\">',
        rndMovie.title,
        '</a></h3></div>'
      ].join(''));

      $('.poster').empty().append([
        '<a href=\"https://www.themoviedb.org/movie/',
        rndMovie.tmdbid,
        '\" target=\"_blank\">',
        '<img class="ui fluid image" src=\"http://image.tmdb.org/t/p/w342',
        rndMovie.poster_path,
        '\"></a>'
      ].join(''));

      $('body')
        .vegas('options', 'slides', [{
          src: 'http://image.tmdb.org/t/p/w780' + rndMovie.backdrop_path
        }])
        .vegas('pause')
        .vegas('play');
    };

    changeContent();

    $("button#nq").click(function() {
      changeContent();
    });

    $('button#tweet').click(function(){
      window.open('https://twitter.com/intent/tweet?text=' + 
      current.quote.replace('\n', ' ') + 
      '&hashtags=flickqtr&url=https://www.themoviedb.org/movie/' + current.movie
      );
      return false;
    });
  });
});
