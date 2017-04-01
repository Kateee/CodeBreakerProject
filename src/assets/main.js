let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer === '' || attempt === '') {
      setHiddenFields();
    }

    if (!(validateInput(input.value))) {
      return false;
    }

    if (getResults(input.value)) {
      setMessage("You Win! :)");
    }
    else if (!getResults(input.value) && attempt.value >= 10) {
      setMessage("You Lose! :(");
    }
    else {
      setMessage("Incorrect, try again.");
    }
    attempt.value = attempt.value + 1;
}

function setHiddenFields() {
  let num = Math.floor(Math.random() * (9999)).toString();
  while (num.length < 4) {
    num = '0' + num;
  }
  answer.value = num;
  attempt.value = 0;
}

function setMessage(msg) {
  message.innerHTML = msg;
}

function validateInput(input) {
  if (input.length == 4) {
    return true;
  }
  else {
  setMessage("Guesses must be exactly 4 characters long.");
  return false;
}
}

function getResults(input) {
  let correctGuesses = 0;
  let initial = '<div class="row"><span class="col-md-6">' + input +
  + '</span><div class="col-md-6">';
  for (var i = 0; i < input.length; i++) {
    if (answer.value[i] === input[i]) {
      initial += '<span class="glyphicon glyphicon-ok"></span>';
      correctGuesses += 1;
    }
    else if (answer.value.includes(input[i])) {
      initial += '<span class="glyphicon glyphicon-transfer"></span>';
    }
    else {
      initial += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }

  initial += '</div>';
  results.innerHTML = initial;
  return (correctGuesses === 4) ? true : false;
}

function showAnswer(gameWon) {
  let result = gameWon ? ' success' : ' failure';
  code.className += result;
  code.innerHTML = answer.value;
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
