// script.js
let intakeArray = [];
let burnedArray = [];

const logButton = document.querySelector('.btn-primary');
logButton.addEventListener('click', logValues);

function logValues() {
  const intakeInput = document.getElementById('caloriesInput');
  const burnedInput = document.getElementById('caloriesBurnedInput');

  const intakeValue = parseInt(intakeInput.value);
  const burnedValue = parseInt(burnedInput.value);

  intakeArray.push(intakeValue);
  burnedArray.push(burnedValue);

  intakeInput.value = '';
  burnedInput.value = '';

  updateTable();
  calculateAndDisplayResults();
}

function updateTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  for (let i = 0; i < intakeArray.length; i++) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${i + 1}</td>
      <td>${intakeArray[i]}</td>
      <td>${burnedArray[i]}</td>
    `;
    tableBody.appendChild(newRow);
  }
}

function formatWeight(value) {
  if (value < 1) {
    return (value * 1000).toFixed(2) + ' grams';
  } else {
    return value.toFixed(2) + ' kilograms';
  }
}

function calculateAndDisplayResults() {
  const totalIntake = intakeArray.reduce((total, intake) => total + intake, 0);
  const totalBurned = burnedArray.reduce((total, burned) => total + burned, 0);
  const calorieDeficit = totalIntake - totalBurned;
  const fatBurned = calorieDeficit / 7700; // Calories per 1 kg of fat

  const calorieDeficitSpan = document.getElementById('calorieDeficit');
  const fatStatusSpan = document.getElementById('fatStatus');

  calorieDeficitSpan.textContent = calorieDeficit;
  fatStatusSpan.textContent = formatWeight(fatBurned);
}