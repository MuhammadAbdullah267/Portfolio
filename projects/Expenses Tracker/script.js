
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let myChart = null;

// Save Budget
function saveBudget() {
    const budgetInput = document.getElementById("budgetInput");

    if (!budgetInput) return;

    const budget = Number(budgetInput.value);

    if (budget <= 0) {
        alert("Please enter a valid budget");
        return;
    }

    localStorage.setItem("budget", budget);
    updateDashboard();
}

// Add Expense
function addExpense() {

    const title = document.getElementById("title").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (!title || amount <= 0) {
        alert("Please fill all fields correctly");
        return;
    }

    expenses.push({
        title,
        amount,
        category,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

    updateDashboard();
}

// Delete Expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    updateDashboard();
}

// Update Dashboard
function updateDashboard() {

    const expenseList = document.getElementById("expenseList");
    const recentList = document.getElementById("recentList");

    if (!expenseList || !recentList) return;

    const budget =
        Number(localStorage.getItem("budget")) || 0;

    let totalExpense = 0;

    expenseList.innerHTML = "";
    recentList.innerHTML = "";

    expenses.forEach((expense, index) => {

        totalExpense += expense.amount;

        expenseList.innerHTML += `
        <tr>
            <td>${expense.title}</td>
            <td>Rs ${expense.amount}</td>
            <td>${expense.category}</td>
            <td>
                <button class="delete-btn"
                onclick="deleteExpense(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    expenses
        .slice(-5)
        .reverse()
        .forEach(item => {

            recentList.innerHTML += `
            <li>${item.title} - Rs ${item.amount}</li>
            `;
        });

    document.getElementById("budgetDisplay").innerText =
        "Rs " + budget;

    document.getElementById("expenseDisplay").innerText =
        "Rs " + totalExpense;

    document.getElementById("balanceDisplay").innerText =
        "Rs " + (budget - totalExpense);

    drawChart();
}

// Chart
function drawChart() {

    const canvas = document.getElementById("expenseChart");

    if (!canvas || typeof Chart === "undefined") return;

    const categories = [
        "Groceries",
        "Restaurants",
        "Rent",
        "Entertainment",
        "Travel",
        "Transport",
        "Subscription"
    ];

    const values = categories.map(category => {

        return expenses
            .filter(item => item.category === category)
            .reduce((sum, item) => sum + item.amount, 0);
    });

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: categories,
            datasets: [{
                label: "Expenses",
                data: values
            }]
        }
    });
}

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll("#expenseList tr");

            rows.forEach(row => {

                row.style.display =
                    row.innerText
                        .toLowerCase()
                        .includes(value)
                        ? ""
                        : "none";
            });
        });
    }

    updateDashboard();
});

