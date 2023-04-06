# Passwords Project

## Description

This web app creates randomly generated passwords based on user input.

## User Story

```
AS AN employee with access to sensitive data
I WANT to randomly generate a password that meets certain criteria
SO THAT I can create a strong password that provides greater security
```

## Acceptance Criteria

```
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
```

## Screenshot

Here is a screenshot from Firefox, showing a pop-up dialog box using the `confirm` function, to ask a yes or no question.

![Pop-up dialog box reads "This page says Should the password contain lowercase letters (abc)? Click OK for 'yes' or Cancel for 'no'."](./Assets/Password-Generator-With-Pop-Ups.png)

I also included error messages.  The user is then immediately prompted to input again.

![The dialog box reads "This page says How long should the password be? Type a number between 8 and 128" with the added error message "Only type a number between 8 and 128."](./Assets/Length-Error.png)

![The alert dialog box reads "This page says **Make sure to include at least one type of character!**"](./Assets/Character-Error.png)

## Comments

1. I had first understood the the acceptance criteria to mean the typical prompts given when using a password generator, like this:

    ![Password Generator showing a slider for length, and a series of checkboxes for type of characters](./Assets/Typical-Password-Generator.png)

    Later, I clarified that the criteria were referring to the pop-up dialog boxes, for example using the `prompt` function.  I preserved my original web app by adding a small link to it at the top of the page, as a way to provide more options.

2. I made two different password generating functions: one that would not necessarily include every type of character selected, and one that would. The first was easier to create, but the second is more likely to be what someone is looking for in a password generator

    I suppose one way of making the second function from the first would be to check to see if it happened to make an inclusive password and, if not, generate another.

    I made the inclusive password generator by making the first few characters be of each selected character type, then randomly filling out the rest. After that, it shuffles and returns the result.

## Credits

1. [Mike Bostock: Fisher-Yates Shuffle](https://bost.ocks.org/mike/shuffle/)

    Since `shuffle` was not already a built-in method, I needed to code it in.  I copied the code from this article.  For more on the Fischer-Yates Shuffle, see the [Wikipedia article](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

2. [OWASP Password Special Characters](https://owasp.org/www-community/password-special-characters)

    This is the website I got my list of special characters from.