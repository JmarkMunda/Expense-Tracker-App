import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import { useExpenses } from "../store/expenses-context";
import {
  deleteExpenseRequest,
  storeExpense,
  updateExpenseRequest,
} from "../util/http";
import { useState } from "react";

import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/manageExpenses/ExpenseForm";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

export default function ManageScreen({ route, navigation }) {
  const { deleteExpense, addExpense, updateExpense, expenses } = useExpenses();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const expenseIdForEdit = route.params?.id;
  const isEditing = !!expenseIdForEdit;
  const selectedExpense = expenses.find(
    (expense) => expense.id === expenseIdForEdit
  );

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const handleDeleteExpense = async () => {
    setIsLoading(true);
    try {
      deleteExpense(expenseIdForEdit);
      await deleteExpenseRequest(expenseIdForEdit);
    } catch (error) {
      setError("Could not delete expense - please try again later");
      setIsLoading(false);
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = async (expenseData) => {
    // -> (expenseData) parameter is an object with amount, date, desc.
    setIsLoading(true);
    try {
      if (isEditing) {
        updateExpense(expenseIdForEdit, expenseData);
        await updateExpenseRequest(expenseIdForEdit, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsLoading(false);
    }
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
