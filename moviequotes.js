/*
The following two files need to be in the same directory as this
ftp://ftp.funet.fi/pub/mirrors/ftp.imdb.com/pub/ratings.list.gz
ftp://ftp.funet.fi/pub/mirrors/ftp.imdb.com/pub/quotes.list.gz
*/


var fs = require('fs');
var zlib = require('zlib');
var iconv = require('iconv-lite');
var split = require('split');
var request = require('request');
var async = require('async');
var colors = require('colors/safe');
var tmdb = require('moviedb')('');
var counter = 0;
var movies = [];
var result = [];

// Configuration
var config = {
  // Number of movies to process, max. 250
  n_movies: 250,
  // Maximum string length of movie quote
  maxquotelength: 100,
  // Maximum number of quotes per movie
  maxnoquotes: 10,
  // Row in ratings.list.gz, where top250 movie list begins
  startline: 27,
  // themoviedb allowes 30 requests per 10sec. Increase if you get HTTP423 errors
  delay: 100 //ms
};

var gunzip = zlib.createGunzip();
var ratings = fs
  .createReadStream('ratings.list.gz', {flags: 'r'})
  .pipe(gunzip)
  .pipe(iconv.decodeStream('latin1'))
  .pipe(iconv.encodeStream('utf8'))
  .pipe(split());

ratings.on('data', function(chunk){
  var re_rating = /^\s+\d+\s+\d+\s+[.\d]+\s+(.+\s\(\d{4}.*)$/;
  if (counter > config.startline
    && counter < config.startline + config.n_movies + 1) {
    movies.push(chunk.match(re_rating)[1]);
  }
  counter++
})

ratings.on('end', function(){
  var gunzip = zlib.createGunzip();
  var quotes = fs
    .createReadStream('quotes.list.gz', {flags: 'r'})
    .pipe(gunzip)
    .pipe(iconv.decodeStream('latin1'))
    .pipe(iconv.encodeStream('utf8'))
    .pipe(split('# '));

  quotes.on('data', function(chunk){
    var search = chunk.match(/(^.+\s\(\d{4}.*)/);
    if (search && movies.indexOf(search[1]) !== -1) {
      result.push({
        title: chunk.split('\n', 1)[0],
        quotes: chunk.replace(/.+(\n){1}/, '')
          .trim()
          .split('\n\n')
          .filter(function(quote){
            return quote.length < config.maxquotelength;
          })
          .sort(function (a, b) {
            if (a.length > b.length) return 1;
            if (a.length < b.length) return -1;
            return 0;
          })
          .slice(0, config.maxnoquotes)
          .map(function(quote){
            // Remove unnecessary imdb lf's
            return quote.replace(/\n\s\s/g, ' ');
          })
    });
    }
  });

  quotes.on('end', function(){
    async.mapSeries(result, function(item, callback){
      getImages(item.title, function(images){
        setTimeout(function() {
          callback(null, {
            title: item.title,
            quotes: item.quotes,
            backdrop_path: images.backdrop_path,
            poster_path: images.poster_path
          });
        }, config.delay);
      });
    }, function(err, result){
      result = result.filter(function(movie){
      return movie.quotes.length !== 0 && movie.backdrop_path !== '';
      });
      var nquotes = result.reduce(function(prev, curr){
        return prev + curr.quotes.length;
      }, 0);

      fs.writeFile("output.json", JSON.stringify(result),
      function(err) {
        if(err) {
          return console.log(err);
        }
        console.log(nquotes + ' quotes for '
        + result.length
        + ' movies written into \'output.json.\'');
        }
      );
    });
  });
});

var getImages = function(title, fn){
  title = title.match(/^(.+)\s\((\d{4}).*/);
  console.log('Processing: ' + title[1] + ', ' + title[2]);
  var backdrops = [];
  tmdb.searchMovie({query: title[1], year: title[2]}, function(err, res){
    if (err) {
      console.log(err);
      fn('');
    }
    else if (res.results.length > 0) {
      fn({
        backdrop_path: res.results[0].backdrop_path,
        poster_path: res.results[0].poster_path
      })
    }
    else {
      console.log(colors.inverse('\'' + title + '\' not found at TMDb'));
      fn('');
    }
  });
}
