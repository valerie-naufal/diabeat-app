import { TextInput, StyleSheet } from "react-native";

export default function InputField({
  placeholder,
  secureTextEntry = false,
}: {
  placeholder: string;
  secureTextEntry?: boolean;
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
});
