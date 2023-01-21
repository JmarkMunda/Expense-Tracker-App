import axios from "axios";

const BACKEND_URL = `https://react-native-course-5090b-default-rtdb.firebaseio.com/`;

// POST REQUEST
export async function storeExpense(expensedData) {
  const response = await axios.post(
    `${BACKEND_URL}expenses.json`,
    expensedData
  );
  const id = response.data.name;
  return id;
}

// GET REQUEST
export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}expenses.json`);

  const expenses = [];

  for (let key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpenseRequest(id, expenseData) {
  return axios.put(`${BACKEND_URL}expenses/${id}.json`, expenseData);
}

export function deleteExpenseRequest(id) {
  return axios.delete(`${BACKEND_URL}expenses/${id}.json`);
}
