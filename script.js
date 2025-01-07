// Select elements
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseDateInput = document.getElementById("expenseDate");
const addExpenseButton = document.getElementById("addExpense");
const totalAmountDisplay = document.getElementById("totalAmount");
const expenseList = document.getElementById("expenseList");

// Load expenses from local storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to format currency
function formatCurrency(amount) {
  return (
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(amount) + " ₹"
  );
}

// Function to render the expense list
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  // Sort expenses by date (latest first)
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

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
                <span>${formatCurrency(expense.amount)}</span>
            </div>
        `;

    expenseList.appendChild(expenseItem);
  });

  // Trigger animation on total amount update
  animateTotalAmount(total);
}

// Function to animate the total amount
function animateTotalAmount(total) {
  // Apply the fade-in and color change animation
  totalAmountDisplay.classList.add("fade-in", "color-change");
  setTimeout(() => {
    totalAmountDisplay.classList.remove("fade-in");
  }, 1000);

  // Smoothly update the total amount
  let currentAmount =
    parseFloat(
      totalAmountDisplay.textContent.replace(" ₹", "").replace(",", "")
    ) || 0;
  let step = (total - currentAmount) / 50; // Divide by 50 for smooth transition

  let counter = 0;
  const interval = setInterval(() => {
    currentAmount += step;
    if (Math.abs(currentAmount - total) < Math.abs(step)) {
      currentAmount = total;
      clearInterval(interval);
    }
    totalAmountDisplay.textContent = formatCurrency(Math.round(currentAmount));
  }, 20);
}

// Function to add a new expense
addExpenseButton.addEventListener("click", () => {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());
  const date = expenseDateInput.value;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Validate date input
  if (name && amount && amount > 0 && date) {
    if (date > today) {
      alert("You cannot add an expense with a future date!");
    } else {
      expenses.push({ name, amount, date });
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
      expenseDateInput.value = "";
    }
  } else {
    alert("Please enter a valid name, amount, and date!");
  }
});

// Initial render
renderExpenses();
