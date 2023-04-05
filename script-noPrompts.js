
let generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Declaring all the types of characters in arrays of single character strings.
// (For next time, I think this might have been possible declaring them just as very long strings, 
// since you can call a character in a string with its index, and that might have been easier to type.) 
const lowercaseLetters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',];
const uppercaseLetters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];
const digits = ['0','1','2','3','4','5','6','7','8','9',];
// Special characters list from https://owasp.org/www-community/password-special-characters
const specialCharacters = ['\u0020','\u0021','\u0022','\u0023','\u0024','\u0025','\u0026','\u0027','\u0029','\u002A','\u002B','\u002C','\u002D','\u002E','\u002F','\u003A','\u003B','\u003C','\u003D','\u003E','\u003F','\u0040','\u005B','\u005C','\u005D','\u005E','\u005F','\u0060','\u007B','\u007C','\u007D','\u007E'];


const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const numbers = document.getElementById('numbers');
const special = document.getElementById('special');

const preferences = [true,true,true,true];
lowercase.addEventListener('change', function(){preferences[0] = this.checked});
uppercase.addEventListener('change', function(){preferences[1] = this.checked});
numbers.addEventListener('change', function(){preferences[2] = this.checked});
special.addEventListener('change', function(){preferences[3] = this.checked});





function generatePassword() {
  const len = Math.floor(2**document.getElementById('length').value);
  // The length of the password is defined so that the slider has a logarithmic scale, for ease of use.

  // Check that the user's preferences include any characters at all.
  if (sum(preferences) == 0) {
    
    lowercase.checked = true;
  // This doesn't show the box as checked???
    preferences[0]=true;
    if (!isError()) {
      errorMessage();
    };
  } else if (isError()) {
    removeError();
  };
  


  let characterList = [];

  if (preferences[0]) {characterList =characterList.concat(lowercaseLetters)};
  if (preferences[1]) {characterList =characterList.concat(uppercaseLetters)};
  if (preferences[2]) {characterList =characterList.concat(digits)};
  if (preferences[3]) {characterList =characterList.concat(specialCharacters)};

  return addCharacters("",len,characterList);
 


}

// This function would return a password that includes at least one of every type of character.
function generatePasswordInclusive() {

  // The length of the password is defined so that the slider has a logarithmic scale, for ease of use.
  const len = Math.floor(2**document.getElementById('length').value);
  
  // If the desired length is very small, and it would be impossible to include one of every type of character.
  if (sum(preferences) > len) {
    return generatePassword();
  };


  // Check that the user's preferences include any characters at all.
  if (sum(preferences) == 0) {
    
    // Make lowercase checked so that a password can be output.
    lowercase.checked = true;
    preferences[0]=true;

    // Include an error message by the checkboxes, if there isn't one there already.
    if (!isError()) {
      errorMessage();
    };
  // If there is still an error message from a previous generated password, remove it.
  } else if (isError()) {
    removeError();
  };

  // Generating a list of allowed characters.
  // At the same time, make the first few characters of the password be of those desired types.
  let characterList = [];
  let password = "";

  if (preferences[0]) {
    characterList =characterList.concat(lowercaseLetters);
    password += randomItem(lowercaseLetters);
  };
  if (preferences[1]) {
    characterList =characterList.concat(uppercaseLetters);
    password += randomItem(uppercaseLetters);
  };
  if (preferences[2]) {
    characterList =characterList.concat(digits);
    password += randomItem(digits);
  };
  if (preferences[3]) {
    characterList =characterList.concat(specialCharacters);
    password += randomItem(specialCharacters);
  };

  return addCharacters(password,len,characterList);
 
  
};



function addCharacters(password,len,characterList){
  // Might should add some checks here. Checking how long password is, that the arguments are the right type, etc.
  const character = randomItem(characterList);
  if (password.length < len) {
    
    return addCharacters(password+character,len,characterList);
  } else if (password.length == len){
    return password;
  } else {
    console.log("error with password length");
  }
  
}

// Write password to the #password input
function writePassword() {
  let password = generatePasswordInclusive();
  let passwordText = document.querySelector("#password");
  passwordText.textContent=password;

  // Erase any added error messages.
}

function errorMessage() {
  // If no checkboxes are checked,
  // 1. Check lowercase letters, so a valid password can be generated.
  // 2. Add a red note to the user to remember to check at least one of the boxes.
 
  let errorMess = document.createElement("span");
  errorMess.setAttribute("id","error");
  errorMess.textContent = "**Check at least one of the boxes so your password has options for characters.**"
  errorMess.style.color = "red";
  let form = document.getElementById('form');
  form.insertBefore(errorMess,form.children[4]);
}

function isError() {
  // Detects if the error message is present.
  const form = document.getElementById('form');
  return (form.children[4].id == "error");
};

function removeError() {
  // Remove the error message when a new password is generated.
  // Must run the function isError() beforehand.
  
  const form = document.getElementById('form');
  form.children[4].remove();
};



function randomItem(arr) {
  const i=Math.floor(arr.length * Math.random());
  return arr[i];
} 

function sum(booleanArray) {
  // Given an array of boolean variables, returns the number of trues.

  let i = 0;

  for (x in booleanArray) {
    if (x) { i++}
  };

  return i;

}

function shuffle(string) {
  // This is to return a random permutation of all the characters in a string
  // This is to modify the password in generatePasswordInclusive.
  
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // This page had a lot of neat code snippets and links to wikipedia articles on shuffling algorithms
  
  // I'm basing this off of this article // https://bost.ocks.org/mike/shuffle/
  
  // Split the string into an array of single character strings
  let array = string.split("");
  
  var m = array.length, t, i;
  
  // While there remain elements to shuffle…
  while (m) {
  
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
  
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  };
  
  // returns the shuffled array merged back together as one string
  return array.join("");
  };