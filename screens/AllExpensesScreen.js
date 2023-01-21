import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { useExpenses } from "../store/expenses-context";

export default function AllExpensesScreen() {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      emptyMessage="No expenses"
    />
  );
}

const styles = StyleSheet.create({});
