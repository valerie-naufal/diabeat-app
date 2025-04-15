import { TextInput, StyleSheet } from "react-native";

export default function InputField({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      value={value}
      onChangeText={onChangeText}
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
