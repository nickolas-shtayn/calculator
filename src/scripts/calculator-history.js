const historyList = [];
const historyDiv = document.querySelector("#history-div");
const toggleBtn = document.querySelector("#toggle");
const clearBtn = document.querySelector("#history-top button");

const addToHistory = (calculation) => {
  const historyEntry = document.createElement("div");
  historyEntry.className = "calculations-result";

  const historyCalculation = document.createElement("div");
  const historyResult = document.createElement("div");

  historyCalculation.className = "calculation";
  historyCalculation.textContent = `${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} =`;

  historyEntry.appendChild(historyCalculation);
  historyEntry.appendChild(historyResult);

  historyResult.className = "result";
  historyResult.textContent = calculation.result;

  historyDiv.appendChild(historyEntry);

  if (!historyList.includes(calculation)) {
    historyList.push({...calculation});
    localStorage.setItem("historyStorage", JSON.stringify(historyList));
  }
};

const loadSavedHistory = () => {
  const savedHistory = localStorage.getItem("historyStorage");
  if (savedHistory) {
    const historyData = JSON.parse(savedHistory);
    historyData.forEach(calculation => {
      historyList.push(calculation);
      addToHistory(calculation);
    });
  }
};

const toggleHistoryPanel = () => {
  toggleBtn.classList.toggle("open");
  toggleBtn.classList.toggle("collapsed");
  historyDiv.classList.toggle("open");
  historyDiv.classList.toggle("collapsed");
};

const clearHistory = () => {
  localStorage.clear();
  historyList.length = 0;
  const historyEntries = document.querySelectorAll(".calculations-result");
  historyEntries.forEach(entry => entry.remove());
};


// export class CalculatorHistory {
//     constructor () {
//         this.historyList = [];
//         this.historyDiv = document.querySelector("#history-div");
//         this.toggleBtn = document.querySelector("#toggle");
//         this.clearBtn = document.querySelector("#history-top button");
//         this.historyDiv.classList.add('collapsed');
//         this.toggleBtn.classList.add('open');
    
//         this.toggleBtn.addEventListener("click", () => this.togglePanel());
//         this.clearBtn.addEventListener("click", () => this.clearHistory());
//         this.historyDiv.addEventListener("click", (event) => this.handleHistoryClick(event));

//         this.loadSavedHistory();
//     }

//     handleHistoryClick(event) {
//         const targetEntry = event.target.closest(".calculations-result");
//         if (targetEntry) {
//             const calculation = targetEntry.querySelector(".calculation").textContent;
//             const parts = calculation.split(" ");
//             const selectedCalculation = {
//                 firstNumber: parts[0],
//                 operation: parts[1],
//                 secondNumber: parts[2].replace('=', '')
//             };
//             this.onHistorySelect(selectedCalculation);
//         }
//     }
// }