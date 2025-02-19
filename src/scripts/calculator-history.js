import { getFirstNumber } from "./calculator-model";

const historyList = [];
const historyDiv = document.querySelector("#history-div");
const toggleBtn = document.querySelector("#toggle");
const clearBtn = document.querySelector("#history-top button");

const createDeleteButton = () => {
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-entry";
  deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>`;
  return deleteButton;
};

const removeHistoryEntry = (entry) => {
  const calculation = JSON.parse(entry.dataset.calculation);

  entry.remove();

  const newHistoryList = historyList.filter(
    (item) =>
      !(
        item.firstNumber === calculation.firstNumber &&
        item.operation === calculation.operation &&
        item.secondNumber === calculation.secondNumber &&
        item.result === calculation.result
      )
  );

  historyList.length = 0;
  historyList.push(...newHistoryList);
  localStorage.setItem("historyStorage", JSON.stringify(historyList));
};

export const addToHistory = (calculation) => {
  const historyEntry = document.createElement("div");
  historyEntry.className = "calculations-result";

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "history-content";

  const historyCalculation = document.createElement("div");
  const historyResult = document.createElement("div");

  historyCalculation.className = "calculation";
  historyCalculation.textContent = `${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} =`;

  historyResult.className = "result";
  historyResult.textContent = calculation.result;

  contentWrapper.appendChild(historyCalculation);
  contentWrapper.appendChild(historyResult);

  historyEntry.appendChild(contentWrapper);
  historyEntry.appendChild(createDeleteButton());

  historyEntry.dataset.calculation = JSON.stringify(calculation);

  historyDiv.appendChild(historyEntry);

  if (!historyList.includes(calculation)) {
    historyList.push({ ...calculation });
    localStorage.setItem("historyStorage", JSON.stringify(historyList));
  }
};

const loadSavedHistory = () => {
  const savedHistory = localStorage.getItem("historyStorage");
  if (savedHistory) {
    const historyData = JSON.parse(savedHistory);
    historyData.forEach((calculation) => {
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
  historyEntries.forEach((entry) => entry.remove());
};

const handleHistoryClick = (event, onHistorySelect) => {
  // Handle delete button clicks
  if (event.target.closest(".delete-entry")) {
    const historyEntry = event.target.closest(".calculations-result");
    if (historyEntry) {
      removeHistoryEntry(historyEntry);
    }
    return;
  }

  // Handle history entry selection
  const targetEntry = event.target.closest(".calculations-result");
  if (targetEntry) {
    if (getFirstNumber() !== "") {
      return;
    }

    const calculation = targetEntry.querySelector(".calculation").textContent;
    const parts = calculation.split(" ");
    const selectedCalculation = {
      firstNumber: parts[0],
      operation: parts[1],
      secondNumber: parts[2].replace("=", ""),
    };
    onHistorySelect(selectedCalculation);
  }
};

export const setupHistory = (onHistorySelect) => {
  historyDiv.classList.add("collapsed");
  toggleBtn.classList.add("open");

  toggleBtn.addEventListener("click", toggleHistoryPanel);
  clearBtn.addEventListener("click", clearHistory);
  historyDiv.addEventListener("click", (event) =>
    handleHistoryClick(event, onHistorySelect)
  );

  loadSavedHistory();
};
