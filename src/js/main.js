import robot from './robot'

let numberOfRows = 0;

let rowContentTemplate =
'<td>' +
'  <div class="compass">' +
'    <div class="ccn">' +
'      <input type="radio" name="cmd-heading-{{rowNumber}}" value="N" id="cmd-heading-n-{{rowNumber}}" class="cmd-heading">' +
'      <label for="cmd-heading-n-{{rowNumber}}">N</label>' +
'    </div>' +
'    <div class="cce">' +
'      <input type="radio" name="cmd-heading-{{rowNumber}}" value="E" id="cmd-heading-e-{{rowNumber}}" class="cmd-heading">' +
'      <label for="cmd-heading-e-{{rowNumber}}">E</label>' +
'    </div>' +
'    <div class="ccs">' +
'      <input type="radio" name="cmd-heading-{{rowNumber}}" value="S" id="cmd-heading-s-{{rowNumber}}" class="cmd-heading">' +
'      <label for="cmd-heading-s-{{rowNumber}}">S</label>' +
'    </div>' +
'    <div class="ccw">' +
'      <input type="radio" name="cmd-heading-{{rowNumber}}" value="W" id="cmd-heading-w-{{rowNumber}}" class="cmd-heading">' +
'      <label for="cmd-heading-w-{{rowNumber}}">W</label>' +
'    </div>' +
'  </div>' +
'</td>' +
'<td><input type="number" class="cmd-distance" id="cmd-distance-{{rowNumber}}" max="100000" min="1"></td>';

function createInputRow(number) {
  let el = document.createElement('tr');
  el.innerHTML = rowContentTemplate.replace(/{{rowNumber}}/g, number);
  return el;
}

function addInputRow() {
  numberOfRows++;
  let row = createInputRow(numberOfRows);
  document.getElementsByTagName('tbody')[0].append(row);
}

document.getElementById('add-row-button').onclick = addInputRow;

function getMoves() {
  let moveList = [];

  for(let i=1; i<=numberOfRows;i++) {
    let headings = document.getElementsByName(`cmd-heading-${i}`);
    let headingValue = Array.from(headings).find(el => el.checked).value;
    let distance = document.getElementById(`cmd-distance-${i}`).value;

    if (headingValue && distance) {
      moveList.push(`${headingValue} ${distance}`);
    }
  }
  return moveList;
}

function startCleaning() {
  let moveList = getMoves();
  let startPosition = {
    x: Number.parseInt(document.getElementById('start-x').value, 10),
    y: Number.parseInt(document.getElementById('start-y').value, 10),
  };
  let cleanedArea = robot.runCleaningRobot({
    startPosition: startPosition,
    moves: moveList
  });
  document.getElementById('result').innerHTML = `<p>Cleaned area: ${cleanedArea}</p>`;
}

document.getElementById('execute-rows').onclick = startCleaning;