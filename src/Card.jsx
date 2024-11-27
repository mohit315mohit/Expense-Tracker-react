import { useDispatch } from "react-redux";
import deleteion from "./assets/deleteion.svg";
import { deleteExpense } from "./features/expenseTracker";
import PropTypes from "prop-types";

export default function Card({ note, amount, date, id }) {
  const dispatch = useDispatch();

  const handleExpenseDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteExpense(id));
  };

  return (
    <div className="bg-white border shadow-[0_45px_70px_-5px_rgba(0,0,0,0.3)]">
      <div className="flex gap-5 p-4">
        <span className="text-3xl font-medium">${amount}</span>
        <div className="flex flex-col w-full">
          <span>{note}</span>
          <span>{date}</span>
        </div>

        <button
          className="w-[70px] flex justify-center items-center"
          onClick={(e) => handleExpenseDelete(e, id)}
          // aria-label="Delete expense" // For better accessibility
        >
          <img
            className="h-6 w-6 hover:h-10 hover:w-10"
            src={deleteion}
            alt="Delete"
          />
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  note: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
