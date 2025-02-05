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

    createDeleteButton() {
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-entry";
        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>`;
        return deleteButton;
    }

    addToHistory(calculation) {
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
        historyEntry.appendChild(this.createDeleteButton());

        historyEntry.dataset.calculation = JSON.stringify(calculation);

        this.historyDiv.appendChild(historyEntry);
        
        if (!this.historyList.includes(calculation)) {
            this.historyList.push({...calculation});
            localStorage.setItem("historyStorage", JSON.stringify(this.historyList));
        }
    }

    removeHistoryEntry(entry) {
        const calculation = JSON.parse(entry.dataset.calculation);
        
        entry.remove();
        
        this.historyList = this.historyList.filter(item => 
            !(item.firstNumber === calculation.firstNumber &&
              item.operation === calculation.operation &&
              item.secondNumber === calculation.secondNumber &&
              item.result === calculation.result)
        );
        
        localStorage.setItem("historyStorage", JSON.stringify(this.historyList));
    }

    handleHistoryClick(event) {
        if (event.target.closest('.delete-entry')) {
            const historyEntry = event.target.closest('.calculations-result');
            if (historyEntry) {
                this.removeHistoryEntry(historyEntry);
            }
            return;
        }

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
}