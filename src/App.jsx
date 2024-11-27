import "./App.css";
import add from "./assets/add.svg";
import Card from "./Card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, addBudget } from "./features/expenseTracker"; // Fixed typo
import LineChart from "./LineChart";
// import PolarChart from "./PolarChart";
import BarChart from "./BarChart";
// import { PolarArea } from "react-chartjs-2";

function App() {
  const [value, setValue] = useState("budget");
  const [isTakingInput, setTakingInput] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [budgetInput, setBudgetInput] = useState("");

  const dispatch = useDispatch();
  const { expenses, budget } = useSelector((state) => state);
  // console.log(expenses);

  const totalExpenses = expenses.reduce(
    (acc, exp) => acc + parseFloat(exp.amount),
    0
  );
  const noOfExpenses = expenses.length;
  const percentage = budget ? ((totalExpenses / budget) * 100).toFixed(2) : 0;
  
  
  
  
  const remainingAmount = budget - totalExpenses;

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (expenseDetails && expenseNote) {
      dispatch(
        addExpense({
          amount: parseFloat(expenseDetails), // Ensure amount is a number
          note: expenseNote,
        })
      );
      setExpenseDetails("");
      setExpenseNote("");
      setTakingInput(false);
    }
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (budgetInput) {
      dispatch(addBudget(parseFloat(budgetInput))); // Fixed typo
      setBudgetInput("");
      setTakingInput(false);
    }
  };

  const container =
    " border bg-white py-4 flex flex-col w-[16.6666666667%] shadow-[0_45px_70px_-5px_rgba(0,0,0,0.3)] aspect-auto";

  return (
    <div className="flex flex-col h-fit min-h-[100dvh] w-full bg-[#ffffff] px-8 py-5 gap-8 ">
      <div className="flex gap-5">
        <div className={container}>
          <span className="text-center py-4 text-2xl font-medium">
            ${totalExpenses}
          </span>
          <span className="text-center"> Total Expense </span>
        </div>
        <div className={container}>
          <span className="text-center py-4 text-2xl font-medium flex flex-col">
            {expenses && noOfExpenses > 0
              ? expenses[noOfExpenses - 1].dateStamp
              : "--"}

            {noOfExpenses > 0 ? (
              <span className="text-center text-sm font-medium text-[#6b6a6a]">
                {expenses && noOfExpenses > 0
                  ? expenses[noOfExpenses - 1].timeStamp
                  : "--"}
              </span>
            ) : (
              ""
            )}
          </span>
          <span className="text-center"> Last Expense </span>
        </div>
        <div className={container}>
          <span className="text-center py-4 text-4xl font-medium">
            {noOfExpenses}
          </span>
          <span className="text-center"> Number of Expenses </span>
        </div>
        <div className={container}>
          <span
            className={`${
              percentage >= 90 ? "text-red-700" : "text-black"
            } text-center py-4 text-4xl font-medium`}
          >
            {percentage}%
          </span>
          <span className="text-center"> Percentages </span>
        </div>
        <div className={container}>
          <span className="text-center py-4 text-2xl font-medium">
            ${budget}
          </span>
          <span className="text-center"> Budget </span>
          {budget ? (
            <span
              className={`text-sm text-center ${
                remainingAmount>1 ? "text-gray-600" : "text-red-700"
              }`}
            >
              Remaining: ${remainingAmount}
            </span>
          ) : (
            ""
          )}
        </div>

        <button
          className={`${container}  items-center justify-center`}
          onClick={() => setTakingInput(true)}
        >
          <img className="w-[100px]" src={add} alt="add" />
        </button>
      </div>

      {isTakingInput && (
        <>
          <div
            className="w-screen h-full absolute bg-[#00000080] left-0 top-0 z-10"
            onClick={() => setTakingInput(false)}
          ></div>
          <div className="w-[350px] p-6 absolute top-[30%] left-[42%] bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg z-20">
            <div className="flex justify-between mb-4 border-b-2 border-white">
              <span
                className={`text-white cursor-pointer px-8 py-2 text-lg font-semibold rounded-t-2xl transition border-2 border-b-0 rounded ${
                  value === "expense" ? "border-white" : "border-transparent"
                }`}
                onClick={() => setValue("expense")}
              >
                Expense
              </span>
              <span
                className={`text-white cursor-pointer px-8 py-2 text-lg font-semibold rounded-t-2xl transition border-2 border-b-0 rounded ${
                  value === "budget" ? "border-white" : "border-transparent"
                }`}
                onClick={() => setValue("budget")}
              >
                Budget
              </span>
            </div>

            {value === "expense" ? (
              <form
                className="flex flex-col space-y-4"
                onSubmit={handleExpenseSubmit}
              >
                <label className="text-gray-300 text-sm font-medium">
                  Expense Amount
                </label>
                <input
                  id="expense"
                  className="p-3 rounded-lg bg-white text-black placeholder-gray-400 border border-white"
                  type="number"
                  placeholder="Enter expense amount"
                  value={expenseDetails}
                  onChange={(e) => setExpenseDetails(e.target.value)}
                />
                <label className="text-gray-300 text-sm font-medium">
                  Note
                </label>
                <input
                  id="note"
                  className="p-3 rounded-lg bg-white text-black placeholder-gray-400 border border-white"
                  type="text"
                  placeholder="Enter note"
                  value={expenseNote}
                  onChange={(e) => setExpenseNote(e.target.value)}
                />
                <button
                  className="p-3 bg-gray-400 text-white rounded-lg shadow-md transition"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <form
                className="flex flex-col space-y-4"
                onSubmit={handleBudgetSubmit}
              >
                <label
                  className="text-gray-300 text-sm font-medium"
                  htmlFor="budget"
                >
                  Budget Amount
                </label>
                <input
                  id="budget"
                  className="p-3 rounded-lg bg-white text-black placeholder-gray-400 border border-white"
                  type="number"
                  placeholder="Enter budget amount"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                />
                <button
                  className="p-3 bg-gray-400 text-white rounded-lg shadow-md transition"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </>
      )}

      <div className="flex gap-5 h-full">
        <div className="flex flex-col text-lg w-[50%] h-full gap-2 border-2 px-8 py-2 bg-white shadow-[0_45px_70px_-5px_rgba(0,0,0,0.3)]">
          <h3 className="text-black text-xl">Expense History</h3>
          {expenses.map((expense, index) => (
            <>
              <Card
                key={index}
                date={expense.dateStamp}
                note={expense.note}
                amount={parseFloat(expense.amount)}
                id={parseFloat(expense.id)}
                remainingAmount={expense.remainingAmount}
              />
            </>
          ))}
        </div>
       { expenses.length?<div className="flex flex-col text-lg w-[50%]  min-h-full items-center border-2 bg-white px-8 py-2  shadow-[0_45px_70px_-5px_rgba(0,0,0,0.3)] gap-4">
          <h3 className="text-black text-xl self-start pb-2">Analyzes.</h3>
          <div className="w-fit h-fit bg-white shadow-[0_45px_70px_-5px_rgba(0,0,0,0.3)] border">
            <LineChart expenses={expenses} />
          </div>
          <div className="w-fit h-fit bg-white shadow-[0_45px_70px_-5px_rgba(0,0,0,0.3)] border">
            {/* <PolarChart expenses={expenses}/> */}
            <BarChart expenses={expenses}/>
            {/* <PolarArea/> */}
          </div>
        </div>:""}
      </div>
    </div>
  );
}

export default App;

// shadow-[0_45px_70px_-5px_rgba(0,0,0,0.3)]
