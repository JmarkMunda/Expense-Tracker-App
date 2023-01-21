import { FlatList, StyleSheet } from "react-native";
import React from "react";

import ExpenseItem from "./ExpenseItem";

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({});
