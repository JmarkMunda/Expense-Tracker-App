import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";
import Button from "../ui/Button";

export default function ExpenseForm(props) {
  const { onCancel, onSubmit, submitButtonLabel, defaultValues } = props;
  // Local State
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const handleInputChange = (inputIdentifier, enteredValue) => {
    setInputs((otherInputs) => ({
      ...otherInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const handleSubmit = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((prevInputs) => ({
        amount: { value: prevInputs.amount.value, isValid: isAmountValid },
        date: { value: prevInputs.date.value, isValid: isDateValid },
        description: {
          value: prevInputs.description.value,
          isValid: isDescriptionValid,
        },
      }));

      return;
    }
    onSubmit(expenseData);
  };

  const isFormInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleInputChange.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleInputChange.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (e) => handleInputChange("description", e),
          value: inputs["description"].value,
        }}
      />
      {isFormInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your inputs
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
