// @author Clark Van Oyen
// web app to occupy a toddler who wants to use your computer.

const end_speak_cb = function() {
  key_avail = true;
};

var last_pics;

const get_best_index = function(word) {
  if (!localStorage[word]) {
    localStorage[word] = '0';
  }
  var index = parseInt(localStorage[word]);
  return index;
};


const draw_word = function(pic) {
  last_pics = [pic];
  document.getElementById("content").style.backgroundImage = "url(" + pic + ".png)"
};

const draw_pics = function(pics) {
  last_pics = pics;
  document.getElementById("content").style.backgroundImage = "url(" + pics.items[get_best_index(word)].media.m.replace(
    /_m.jpg/g,
    ".jpg") + ")"
};

var key_avail = true;
var word;
const handle_key = function(e) {
  if (!key_avail) return;
  /*if (e.which == 27) {
    if (!localStorage[word]) {
      localStorage[word] = 0;
    }
    localStorage[word] = (parseInt(localStorage[word]) + 1) % 20;
    draw_pics(last_pics);
    return;
  }*/

  var letter = String.fromCharCode(e.which);
  if (!/[a-zA-Z\d]/.test(letter)) return;

  key_avail = false;
  //document.getElementById('letter').innerHTML = letter;

  var words = WORDS_BY_FIRST_LETTER[letter.toLowerCase()];
  if (words) {

    word = words[Math.floor(Math.random() * words.length)];
    var is_for = " is for " + word.replace(
    /_/g,
    " ");
	draw_word(word)
	/*
    var script = document.createElement('script');
    script.src = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=draw_pics&tags=" + word +
      "&tagmode=any&per_page=1&sort=relevance&format=json&";
    document.getElementsByTagName('head')[0].appendChild(script);*/
  } else {
    word = null;
    is_for = "";
    document.getElementById("content").style.backgroundImage = null;
  }
  document.getElementById('is_for').innerHTML = "" //is_for;

  setTimeout(function() {
    key_avail = true
  }, 2000);

  responsiveVoice.speak(letter, "UK English Female", {
    onend: function() {
      setTimeout(function() {

        if (word) responsiveVoice.speak(letter + is_for, "UK English Male", {
          onend: end_speak_cb
        });
      }, 400);
    }
  })
};

document.addEventListener('keyup', handle_key)
/*
const WORDS = ['apple', 'arm', 'ball', 'banana', 'bat', 'bed', 'bike', 'bird', 'book', 'boy', 'bun', 'cake',
  'can', 'cap', 'car', 'cat', 'chin', 'clover', 'corn', 'cow', 'crayon', 'crow',
  'crown', 'cub', 'cup', 'dirt', 'dog', 'doll', 'dress', 'dust', 'elephant', 'fan',
  'fang ',
  'feet', 'field', 'flag', 'flower', 'fog', 'game', 'girl', 'hall', 'hat', 'heat', 'hen', 'hill', 'home',
  'horn', 'hose', 'island', 'jar', 'juice', 'kite', 'kite', 'lake', 'man', 'map', 'mask',
  'meat',
  'men', 'mice', 'milk', 'leaf', 'moon', 'morning', 'mother', 'nest', 'nose', 'orange', 'pan', 'pear',
  'pen',
  'pencil', 'pet', 'pie', 'pig', 'plant', 'pot', 'queen', 'rain', 'rat', 'river', 'road', 'rock', 'room', 'rose',
  'sun', 'toe', 'tub', 'tree', 'umbrella', 'van', 'water', 'xylophone', 'yak', 'zipper'
]
*/
const WORDS = [
"alligator",
"bear",
"cat",
"duck",
"elephant",
"frog",
"giraffe",
"hippopotamus",
"iguana",
"jellyfish",
"koala",
"lion",
"monkey",
"narwhal",
"octopus",
"pig",
"quetzal",
"rabbit",
"snake",
"tiger",
"unicorn",
"vampire_bat",
"whale",
"xray_fish",
"yak",
"zebra",
]

WORDS_BY_FIRST_LETTER = {};

WORDS.forEach(function(word) {
  var first_letter = word.charAt(0);
  if (!WORDS_BY_FIRST_LETTER[first_letter]) WORDS_BY_FIRST_LETTER[first_letter] = [];
  WORDS_BY_FIRST_LETTER[first_letter].push(word);
});
