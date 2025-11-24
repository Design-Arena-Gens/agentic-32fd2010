const simulatorContainer = document.querySelector('#simulator');

const truthTable = [
  { a: 0, b: 0, and: 0, or: 0 },
  { a: 0, b: 1, and: 0, or: 1 },
  { a: 1, b: 0, and: 0, or: 1 },
  { a: 1, b: 1, and: 1, or: 1 }
];

const state = {
  a: 0,
  b: 0
};

const createToggle = (label) => {
  const button = document.createElement('button');
  button.className = 'toggle';
  const span = document.createElement('span');
  span.textContent = `${label}: 0`;
  button.appendChild(span);

  button.addEventListener('click', () => {
    state[label.toLowerCase()] = state[label.toLowerCase()] ? 0 : 1;
    span.textContent = `${label}: ${state[label.toLowerCase()]}`;
    button.classList.toggle('active', Boolean(state[label.toLowerCase()]));
    updateResults();
  });

  return button;
};

const renderInputs = () => {
  const inputs = document.createElement('div');
  inputs.className = 'inputs';
  inputs.appendChild(createToggle('A'));
  inputs.appendChild(createToggle('B'));
  return inputs;
};

const renderTable = () => {
  const table = document.createElement('table');
  table.className = 'truth-table';
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>A</th>
      <th>B</th>
      <th>AND</th>
      <th>OR</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  truthTable.forEach((row) => {
    const tr = document.createElement('tr');
    tr.dataset.key = `${row.a}${row.b}`;
    tr.innerHTML = `
      <td>${row.a}</td>
      <td>${row.b}</td>
      <td>${row.and}</td>
      <td>${row.or}</td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  return { table, tbody };
};

const renderLeds = () => {
  const container = document.createElement('div');
  container.className = 'leds';

  const createLed = (label) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'led';

    const bulb = document.createElement('div');
    bulb.className = 'led__bulb';
    bulb.dataset.label = label;

    const ledLabel = document.createElement('span');
    ledLabel.className = 'led__label';
    ledLabel.textContent = label;

    wrapper.appendChild(bulb);
    wrapper.appendChild(ledLabel);
    return wrapper;
  };

  container.appendChild(createLed('AND Output'));
  container.appendChild(createLed('OR Output'));
  return container;
};

const inputsEl = renderInputs();
const { table: tableEl } = renderTable();
const ledsEl = renderLeds();

simulatorContainer.appendChild(inputsEl);
simulatorContainer.appendChild(tableEl);
simulatorContainer.appendChild(ledsEl);

const updateResults = () => {
  const { a, b } = state;
  const andOutput = a & b;
  const orOutput = a | b;
  const key = `${a}${b}`;

  document.querySelectorAll('.truth-table tbody tr').forEach((row) => {
    row.classList.toggle('active', row.dataset.key === key);
  });

  document.querySelectorAll('.led__bulb').forEach((bulb) => {
    const label = bulb.dataset.label;
    const isOn = label === 'AND Output' ? andOutput : orOutput;
    bulb.classList.toggle('on', Boolean(isOn));
  });
};

updateResults();
