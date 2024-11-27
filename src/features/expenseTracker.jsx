/* eslint-disable no-case-declarations */
const generateId = () => Math.random().toString().substring(2, 9);

const generatedateStamp = () => new Date().toLocaleDateString();
const generatetimeStamp = () => new Date().toLocaleTimeString();

const initialState = {
  expenses: localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses"))
    : [],
  budget: localStorage.getItem("budget")? parseFloat(JSON.parse(localStorage.getItem("budget"))).toFixed(2):0.00,
};

// Action Types
export const ADD_EXPENSE = "ADD_EXPENSE";
export const ADD_BUDGET = "ADD_BUDGET";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";

// Action Creators
export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const addBudget = (budget) => ({
  type: ADD_BUDGET,
  payload: budget,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const updateExpense = (expenseToUpdate, updatedExpense) => ({
  type: UPDATE_EXPENSE,
  payload: { expenseToUpdate, updatedExpense },
});

// Reducer
const expenseTrackerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_EXPENSE: {
      const note = payload.note ?? "";
      const id = generateId();
      console.log(id);
      const amount = parseFloat(payload.amount).toFixed(2) ?? 0;
      const dateStamp = generatedateStamp();
      const timeStamp = generatetimeStamp();
      const pre = localStorage.getItem("expenses")
        ? JSON.parse(localStorage.getItem("expenses"))
        : [];

      const updateExpenses = [
        ...pre,
        { note, amount, dateStamp, timeStamp, id },
      ];

      // Save updated expenses back to localStorage
      localStorage.setItem("expenses", JSON.stringify(updateExpenses));

      return {
        ...state,
        expenses: updateExpenses,
      };
    }

    case DELETE_EXPENSE:
      console.log(payload);
      const updatedExpensesAfterDelete = state.expenses.filter(
        (exp) => parseFloat(exp.id) !== payload
      );

      // Update localStorage after deleting an expense
      localStorage.setItem(
        "expenses",
        JSON.stringify(updatedExpensesAfterDelete)
      );

      return {
        ...state,
        expenses: updatedExpensesAfterDelete,
      };

    case UPDATE_EXPENSE: {
      const { expenseToUpdate, updatedExpense } = payload;
      const updatedExpenses = state.expenses.map((exp) =>
        exp.id === expenseToUpdate.id ? { ...updatedExpense, id: exp.id } : exp
      );

      // Update localStorage after updating an expense
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      return {
        ...state,
        expenses: updatedExpenses,
      };
    }

    case ADD_BUDGET:
      const newBudget = parseFloat(payload); // The new budget input
      const updatedBudget = parseFloat(state.budget) + newBudget; // Add it to the current budget
      const formattedBudget = updatedBudget.toFixed(2); // Format to two decimal places

      // Save the updated budget to localStorage
      localStorage.setItem("budget", formattedBudget);

      return {
        ...state,
        budget: formattedBudget, // Update the state with the new budget
      };

    default:
      return state;
  }
};

export default expenseTrackerReducer;
