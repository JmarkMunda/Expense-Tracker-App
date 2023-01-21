import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export default function ExpensesOutput(props) {
  const { expenses, expensesPeriod, emptyMessage } = props;

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {/* EXPENSES LIST */}
      {expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{emptyMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
