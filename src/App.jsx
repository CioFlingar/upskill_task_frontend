import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/expenses/";

function App() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ title: "", amount: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to load expenses. Check that the backend is running.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const resetForm = () => {
    setForm({ title: "", amount: "" });
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    const expense = {
      title: form.title.trim(),
      amount: Number(form.amount),
    };
    const url = editingId === null ? API_URL : `${API_URL}${editingId}/`;
    const method = editingId === null ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const savedExpense = await response.json();
      setData((currentData) => {
        if (editingId === null) {
          return [...(currentData ?? []), savedExpense];
        }
        return currentData.map((item) =>
          item.id === editingId ? savedExpense : item,
        );
      });
      resetForm();
    } catch (error) {
      console.error("Error saving expense:", error);
      setError("Unable to save the expense. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setForm({ title: expense.title, amount: String(expense.amount) });
    setError("");
  };

  return (
    <>
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Expense Dashboard</a>
        </div>
      </nav>

      <main className="flex flex-col gap-6 p-6 md:flex-row">
        <form
          className="card h-fit w-full bg-base-200 shadow-sm md:max-w-sm"
          onSubmit={handleSubmit}
        >
          <div className="card-body">
            <h2 className="card-title">
              {editingId === null ? "Add expense" : "Update expense"}
            </h2>
            <label className="form-control">
              <span className="label-text">Title</span>
              <input
                className="input input-bordered"
                name="title"
                onChange={handleChange}
                placeholder="Office supplies"
                required
                type="text"
                value={form.title}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Amount</span>
              <input
                className="input input-bordered"
                min="0"
                name="amount"
                onChange={handleChange}
                placeholder="25.50"
                required
                step="0.01"
                type="number"
                value={form.amount}
              />
            </label>
            <div className="card-actions mt-2">
              <button className="btn btn-primary" disabled={isSaving} type="submit">
                {isSaving
                  ? "Saving..."
                  : editingId === null
                    ? "Add expense"
                    : "Update expense"}
              </button>
              {editingId !== null && (
                <button className="btn btn-ghost" onClick={resetForm} type="button">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="card w-full bg-amber-400 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Expenses</h2>
            {error && <p className="alert alert-error">{error}</p>}
            {data ? (
              <ul className="space-y-2">
                {data.map((item) => (
                  <li
                    className="flex items-center justify-between rounded-lg bg-base-100 p-3"
                    key={item.id}
                  >
                    <span>
                      {item.title}: ${item.amount}
                    </span>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => startEditing(item)}
                      type="button"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
