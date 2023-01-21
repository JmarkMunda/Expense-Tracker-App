import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useExpenses } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { useState } from "react";

import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ExpensesOutput from "../components/expenses/ExpensesOutput";

export default function RecentExpensesScreen() {
  const { expenses, setExpenses } = useExpenses();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (error) {
        setError("Could not get expenses!");
      }
      setIsFetching(false);
    };

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      emptyMessage="No recent expenses"
    />
  );
}

const styles = StyleSheet.create({});
