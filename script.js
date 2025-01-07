// Select elements
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseDateInput = document.getElementById("expenseDate");
const addExpenseButton = document.getElementById("addExpense");
const totalAmountDisplay = document.getElementById("totalAmount");
const expenseList = document.getElementById("expenseList");

// Load expenses from local storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render the expense list
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense) => {
    total += parseFloat(expense.amount);

    const expenseItem = document.createElement("div");
    expenseItem.className = "expense-item";

    expenseItem.innerHTML = `
            <div>
                <span><strong>${expense.name}</strong></span><br>
                <span>${expense.date}</span>
            </div>
            <div>
                <span>${expense.amount}</span>
            </div>
        `;

    expenseList.appendChild(expenseItem);
  });

  totalAmountDisplay.textContent = total.toFixed(2);
}

// Function to add a new expense
addExpenseButton.addEventListener("click", () => {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());
  const date = expenseDateInput.value;

  if (name && amount && amount > 0 && date) {
    expenses.push({ name, amount, date });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    expenseDateInput.value = "";
  } else {
    alert("Please enter a valid name, amount, and date!");
  }
});

// Initial render
renderExpenses();
