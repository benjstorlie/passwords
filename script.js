
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

const lenMessage = "How long should the password be?\nType a number between 8 and 128.";
const lenError = "\nOnly type a number between 8 and 128.";
const prefMessage = "Should the password contain\n";
const confirmMessage = "\nClick OK for 'yes' or Cancel for 'no'.";
const errorMessage = "**Make sure to include at least one type of character!**";

// Generate a prompt to get the preferred length.
function declareLength () {
  
  let len = Number(prompt(lenMessage,"8"));
  console.log(len);

  // Ensuring that the length the type we want.
  while (len < 8 || len > 128 || isNaN(len)) {
    len = Number(prompt(lenMessage+lenError,"8"));
  }
  return len;
}

// Generate prompts to get preferences of which types of characters.
function declarePreferences() {
  let preferences = [
    confirm(prefMessage+'lowercase letters (abc)?'+confirmMessage),
    confirm(prefMessage+'uppercase letters (ABC)?'+confirmMessage),
    confirm(prefMessage+'numbers (123)?'+confirmMessage),
    confirm(prefMessage+'special characters (!#$)?'+confirmMessage)
  ];

  console.log(preferences);
  console.log(sum(preferences));
  // Check that any characters were selected.
  // Otherwise run the function again.
  if (sum(preferences) == 0){
    alert(errorMessage);
    return declarePreferences();
  } else {
    return preferences;
  }
};

function generatePassword() {

  let len = declareLength();
  let preferences = declarePreferences();

  return generatePasswordInclusive(len,preferences);
};


function generatePasswordNonInclusive(len,preferences) {
  // This function is not inclusive, so it is not guaranteed to contain every type of character selected by the user.

  let characterList = [];

  if (preferences[0]) {characterList =characterList.concat(lowercaseLetters)};
  if (preferences[1]) {characterList =characterList.concat(uppercaseLetters)};
  if (preferences[2]) {characterList =characterList.concat(digits)};
  if (preferences[3]) {characterList =characterList.concat(specialCharacters)};

  return addCharacters("",len,characterList);
}


function generatePasswordInclusive(len,preferences) { 
  // This function would return a password that includes at least one of every type of character.
  // If the desired length is very small, and it would be impossible to include one of every type of character.
  // Since the minimum password length is 8, this isn't an option anyway, but could be useful in the future.
  if (sum(preferences) > len) {
    return generatePasswordNonInclusive();
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
  let character = randomItem(characterList);
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
  let password = generatePassword();
  let passwordText = document.querySelector("#password");
  passwordText.textContent=password;
}

function randomItem(arr) {
  const i=Math.floor(arr.length * Math.random());
  return arr[i];
} 

function sum(booleanArray) {
  // Given an array of boolean variables, returns the number of trues.

  let i = 0;

  for (x in booleanArray) {
    if (booleanArray[x]) { i++}
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