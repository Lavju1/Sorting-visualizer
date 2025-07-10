const stage = document.getElementById("stage");
const generateBtn = document.getElementById("generateBtn");
const solveBtn = document.getElementById("solveBtn");
const selectAlgorithm = document.getElementById("selectAlgorithm");
const numbersBars = document.getElementById("numbersBars");

let array = [];

function generateBars(size) {
  array = [];
  stage.innerHTML = ""; // Clear previous

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 250) + 50;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.style.left = `${i * 35}px`;

    stage.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;

        bars[j].classList.add("activate");
        bars[j + 1].classList.add("activate");

        await sleep(150);

        bars[j].classList.remove("activate");
        bars[j + 1].classList.remove("activate");
      }
    }
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;

      bars[i].classList.add("activate");
      bars[minIndex].classList.add("activate");

      await sleep(150);

      bars[i].classList.remove("activate");
      bars[minIndex].classList.remove("activate");
    }
  }
}

async function quickSort(low = 0, high = array.length - 1) {
  if (low < high) {
    let pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  const bars = document.getElementsByClassName("bar");
  let pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;

      bars[i].classList.add("activate");
      bars[j].classList.add("activate");

      await sleep(150);

      bars[i].classList.remove("activate");
      bars[j].classList.remove("activate");
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[high].style.height = `${array[high]}px`;

  await sleep(150);

  return i + 1;
}

// Event Listeners
generateBtn.addEventListener("click", () => {
  const size = parseInt(numbersBars.value);
  if (size >= 1 && size <= 20) {
    generateBars(size);
  }
});

solveBtn.addEventListener("click", async () => {
  const algorithm = selectAlgorithm.value;
  if (algorithm === "bubbleSort") await bubbleSort();
  else if (algorithm === "selectionSort") await selectionSort();
  else if (algorithm === "quickSort") await quickSort();
});

// Generate initial array
generateBars(parseInt(numbersBars.value));
