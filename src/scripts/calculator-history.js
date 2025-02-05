export class CalculatorHistory {
    constructor () {
        this.historyList = [];
        this.historyDiv = document.querySelector("#history-div");
        this.toggleBtn = document.querySelector("#toggle");
        this.clearBtn = document.querySelector("#history-top button");
        this.historyDiv.classList.add('collapsed');
        this.toggleBtn.classList.add('open');
    
        this.toggleBtn.addEventListener("click", () => this.togglePanel());
        this.clearBtn.addEventListener("click", () => this.clearHistory());
        this.historyDiv.addEventListener("click", (event) => this.handleHistoryClick(event));

        this.loadSavedHistory();
    }

    loadSavedHistory() {
        const savedHistory = localStorage.getItem("historyStorage");
        if (savedHistory) {
            const historyData = JSON.parse(savedHistory);
            historyData.forEach(calculation => {
                this.historyList.push(calculation);
                this.addToHistory(calculation); 
            });
        }
    }

    addToHistory(calculation) {
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

        this.historyDiv.appendChild(historyEntry);
        
        if (!this.historyList.includes(calculation)) {
            this.historyList.push({...calculation});
            localStorage.setItem("historyStorage", JSON.stringify(this.historyList));
        }
    }

    togglePanel() {
        this.toggleBtn.classList.toggle("open");
        this.toggleBtn.classList.toggle("collapsed");
        this.historyDiv.classList.toggle("open");
        this.historyDiv.classList.toggle("collapsed");
    }

    clearHistory() {
        localStorage.clear();
        this.historyList = [];
        const historyEntries = document.querySelectorAll(".calculations-result");
        historyEntries.forEach(entry => entry.remove());
    }

    handleHistoryClick(event) {
        const targetEntry = event.target.closest(".calculations-result");
        if (targetEntry) {
            const calculation = targetEntry.querySelector(".calculation").textContent;
            const parts = calculation.split(" ");
            const selectedCalculation = {
                firstNumber: parts[0],
                operation: parts[1],
                secondNumber: parts[2].replace('=', '')
            };
            this.onHistorySelect(selectedCalculation);
        }
    }
}