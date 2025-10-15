import React, { useState } from "react";
import {
  Calendar,
  Filter as FilterIcon,
  Search,
  RefreshCcw,
} from "lucide-react";
import DashBoard from "../components/DashBoard";
import AxiosConfig from "../util/AxiosConfig";
import { ApiEndpoints } from "../util/ApiEndpoints";
import toast from "react-hot-toast";

const Filter = () => {
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const { data } = await AxiosConfig.post(ApiEndpoints.FILTER_DATA, {
     
          type,
          startDate,
          endDate,
          keyword,
          sortBy,
          sortOrder,
      
      });
      console.log(data);
      
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setType("income");
    setStartDate("");
    setEndDate("");
    setKeyword("");
    setSortBy("date");
    setSortOrder("asc");
    setTransactions([]);
  };

  return (
    <DashBoard>
      <div className="min-h-screen bg-gradient-to-tr from-[#a1c4fd] via-[#c2e9fb] to-[#d4fc79] p-6">
        <div className="max-w-6xl mx-auto">
          {/* Filter Card */}
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200 transition-transform hover:scale-[1.01]">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
              <FilterIcon className="text-blue-500" />
              Filter Transactions
            </h2>

            {/* Filter Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                <div className="flex items-center mt-1 border border-gray-300 rounded-lg p-2">
                  <Calendar className="text-blue-500 mr-2" size={18} />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">End Date</label>
                <div className="flex items-center mt-1 border border-gray-300 rounded-lg p-2">
                  <Calendar className="text-blue-500 mr-2" size={18} />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Keyword */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Keyword</label>
                <div className="flex items-center mt-1 border border-gray-300 rounded-lg p-2">
                  <Search className="text-blue-500 mr-2" size={18} />
                  <input
                    type="text"
                    value={keyword}
                    placeholder="Enter keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Sort Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Sort Field</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">Sort Order</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleFilter}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                Apply Filters
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center"
              >
                <RefreshCcw size={16} className="mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="text-gray-700 text-xl text-center col-span-3">Loading...</div>
            ) : transactions.length === 0 ? (
              <div className="text-gray-700 text-xl text-center col-span-3">No transactions found.</div>
            ) : (
              transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-blue-400 hover:shadow-xl transition-transform hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{txn.categoryName}</h4>
                      <p className="text-sm text-gray-500">{txn.name}</p>
                    </div>
                    <div className={`text-lg font-bold ${txn.type === "income" ? "text-green-600" : "text-red-500"}`}>
                      ₹{txn.amount}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{new Date(txn.date).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashBoard>
  );
};

export default Filter;
