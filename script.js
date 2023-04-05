// Assignment Code
let generateBtn = document.querySelector("#generate");

const lowercaseLetters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',];
const uppercaseLetters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];
const digits = ['0','1','2','3','4','5','6','7','8','9',];
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

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


function generatePassword() {
  let len = Math.floor(2**document.getElementById('length').value);

  console.log("preferences: ");
  console.log(preferences);

  // Check that the user's preferences include any characters at all.
  if (!(preferences[0] || preferences[1] || preferences[2] || preferences[3])) {
    
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
  
};

function addCharacters(password,len,characterList){
  // Might should add some checks here. Checking how long password is, that the arguments are the right type, etc.
  const character = randomItem(characterList);
  if (password.length < len-1) {
    
    return addCharacters(password+character,len,characterList);
  } else {
    return password+character;
  }
  
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
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