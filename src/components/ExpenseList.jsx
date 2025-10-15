import React from "react";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({ transactions = [], loading = false, onDeleteRequest, onEditRequest }) => {
  if (loading) return <div className="p-6">Loading...</div>;
  if (!transactions.length)
    return <div className="p-6 text-gray-500">No expense records yet. Add one to get started.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {transactions.map((t) => (
        <ExpenseCard
          key={t.id}
          icon={t.icon}
          title={t.name}
          date={t.date}
          amount={t.amount}
          category={t.categoryName}
          onDelete={() => onDeleteRequest(t)}
          onEdit={() => onEditRequest(t)}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
