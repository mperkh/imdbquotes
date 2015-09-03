![Screenshot of final app](screenshot.jpg?raw=true "Screenshot")
# IMDb and TMDb quotes and movie backdrop parser
Parse IMDb and TMDb data to generate a collection of movie quotes with backdrop images. Basis for [my contribution](http://codepen.io/mperkh/full/pJmJOM) to Freecodecamp's [Random Quote Machine Zipline](http://www.freecodecamp.com/challenges/zipline-build-a-random-quote-machine).

To run, first issue
````
npm install
````
to install all dependencies. 

The following two files need to be in the same directory
### IMDb data files
```
ftp://ftp.funet.fi/pub/mirrors/ftp.imdb.com/pub/ratings.list.gz
ftp://ftp.funet.fi/pub/mirrors/ftp.imdb.com/pub/quotes.list.gz
```
### TMDb API Key
Can be obtained from https://www.themoviedb.org/documentation/api

Then issue the script using:

```
node moviequotes.js -a apikey [-n] [-m] [-q] [-l] [-d]
  -a API key for TMDb, required
  -n num Number of movies to process, max. 250, default: 250
  -m num Maximum string length of movie quote, default: 100
  -q num Maximum number of quotes per movie, default: 10
  -l num Row in ratings.list.gz, where top250 movie list begins, default: 27
  -d num dely in ms for access to themoviedb api, default: 100
```

The script writes the resulting JSON file into `output.json` into the current directory.

### Demo of `output.json`
```json
[
    {
    "title": "The Dark Knight (2008)",
    "tmdbid": 155,
    "backdrop_path": "/nnMC0BM6XbjIIrT4miYmMtPGcQV.jpg",
    "poster_path": "/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
    "quotes": [
      "The Joker: We made it!",
      "Cop Heckler: No more dead cops!",
      "Two-Face: IT'S ABOUT WHAT'S FAIR.",
      "The Joker: And... here... we... go!",
      "The Joker: You'll see. I'll show you.",
      "[repeated line]\nThe Joker: Why so serious?"
    ]
  },
  {
    "title": "The Godfather (1972)",
    "tmdbid": 238,
    "backdrop_path": "/6xKCYgH16UuwEGAyroLU6p8HLIn.jpg",
    "poster_path": "/d4KNaTrltq6bpkFS01pYtyXa09m.jpg",
    "quotes": [
      "Sonny: Goddamn FBI don't respect nothin'.",
      "Clemenza: Paulie, pull over, I gotta take a leak.",
      "Calo: In Sicily, women are more dangerous than shotguns.",
      "Sonny: How's Paulie?\nClemenza: Oh, Paulie... won't see him no more."
    ]
  },
]
```
