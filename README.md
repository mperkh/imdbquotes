# IMDb and TMDb quotes and movie backdrop parser
Parse IMDb and TMDb data to generate a collection of movie quotes with backdrop images. Basis for my contribution to Freecodecamp's [Random Quote Machine Zipline](http://www.freecodecamp.com/challenges/zipline-build-a-random-quote-machine).

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
````
### TMDb API Key
Can be obtained from https://www.themoviedb.org/documentation/api - enter key into the config section of `moviequotes.js`.

Then issue the script using
````
node moviequotes.js
```
The script writes the resulting JSON file into `output.json` into the current directory.

### Demo of `output.json`
```json
[
  {
    "title": "12 Angry Men (1957)",
    "quotes": [
      "Juror #3: [recurring line] You *what?*\nJuror #5, Juror #7: You heard me.",
      "Juror #6: You think he's not guilty, huh?\nJuror #8: I don't know. It's *possible*."
    ],
    "backdrop_path": "/lH2Ga8OzjU1XlxJ73shOlPx6cRw.jpg"
  },
  {
    "title": "12 Years a Slave (2013)",
    "quotes": [
      "Solomon Northup: I don't want to survive. I want to live.",
      "Freeman: Put the least thought in your head. C'mon, now. Think of somethin'.",
      "Tibeats: I thought I told yah ta commence ta puttin' on clapboards this morn'.",
      "[first lines]\nOverseer: Alright now, y'all fresh niggers. Y'all gonna be in the cuttin' gang."
    ],
    "backdrop_path": "/xnRPoFI7wzOYviw3PmoG94X2Lnc.jpg"
  },
  {
    "title": "2001: A Space Odyssey (1968)",
    "quotes": [
      "Poole's Father: See you next Wednesday.",
      "HAL: Just what do you think you're doing, Dave?",
      "Dr. Floyd: You guys have really come up with somethin'.",
      "Dr. Floyd: I'm sorry, I'm simply not at liberty to say.",
      "[first lines]\nAries-1B stewardess: Here you are, sir, main level please.",
      "Stewardess: Thank you. You are cleared through Voiceprint Identification.",
      "HAL: Dave, stop. Stop, will you? Stop, Dave. Will you stop Dave? Stop, Dave.",
      "Dr. Floyd: [upon learning about the monolith while on the moonbus] Deliberately buried. Huh!",
      "HAL: I've just picked up a fault in the AE35 unit. It's going to go 100% failure in 72 hours."
    ],
    "backdrop_path": "/pckdZ29bHj11hBsV3SbVVfmCB6C.jpg"
  }
]
```
