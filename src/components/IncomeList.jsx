import React from "react";
import TransactionCard from "./TranctionalCard";

const IncomeList = ({ transactions = [], loading = false, onDeleteRequest }) => {
  if (loading) return <div className="p-6">Loading...</div>;
  if (!transactions.length)
    return <div className="p-6 text-gray-500">No income records yet. Add one to get started.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {transactions.map((t) => (
        <TransactionCard
          key={t.id}
          icon={t.icon}
          title={t.name}
          date={t.date}
          amount={t.amount}
          category={t.categoryName}
          onDelete={() => onDeleteRequest && onDeleteRequest(t)}
        />
      ))}
    </div>
  );
};

export default IncomeList;
