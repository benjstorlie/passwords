// Assignment Code
let generateBtn = document.querySelector("#generate");

const lowercaseLetters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const uppercaseLetters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const digits = ['0','1','2','3','4','5','6','7','8','9'];
const specialCharacters = ['\u0020','\u0021','\u0022','\u0023','\u0024','\u0025','\u0026','\u0027','\u0029','\u002A','\u002B','\u002C','\u002D','\u002E','\u002F','\u003A','\u003B','\u003C','\u003D','\u003E','\u003F','\u0040','\u005B','\u005C','\u005D','\u005E','\u005F','\u0060','\u007B','\u007C','\u007D','\u007E'];

const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const special = document.getElementById('special');




function generatePassword() {
  let len = 2**document.getElementById('length').value;

  let preferences = [
    uppercase.value,
    lowercase.value,
    numbers.value,
    special.value
  ];

  // Check that the user's preferences include any characters at all.
  if (!(preferences[0]+preferences[1]+preferences[2]+preferences[3])) {
    

    
  };

  let characterList = "";

  if (preferences[0]) {characterList += lowercaseLetters};
  if (preferences[1]) {characterList += uppercaseLetters};
  if (preferences[2]) {characterList += digits};
  if (preferences[3]) {characterList += specialCharacters};

  characterList = characterList.flat();

  let password = "";
 

  for (let x=0 ; x < len ; x++) {
    password = password + addCharacter(characterList)
  }
}

// Function to add a single character to the password being generated, given a list of 
function addCharacter(characterList){

}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  if (password) {
    passwordText.value = password;
  } else {
    // If password is undefined, which is how an error is indicated, and the user has all boxes unchecked.
    passwordText.value = "Error message. Please check one of the boxes."
  }
}

function errorMessage() {
  // If no checkboxes are checked,
  // 1. Check lowercase letters, so a valid password can be generated.
  // 2. Add a red note to the user to remember to check at least one of the boxes.
  document.getElementById('lowercase').setAttribute('checked',True);

  let errorMess = document.createElement("div");
  errorMess.textContent = "Check at least one of the boxes so your password has options for characters."
  errorMess.style.color = "red";
  let form = document.getElementById('form')
  form.insertBefore(errorMess,form.children[2]);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
