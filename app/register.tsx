import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <InputField placeholder="Full Name" />
      <InputField placeholder="Email" />
      <InputField placeholder="Password" secureTextEntry />
      <InputField placeholder="Confirm Password" secureTextEntry />

      <ActionButton
        title="Register"
        onPress={() => console.log("Registering user...")}
      />

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 32,
    textAlign: "center",
    color: Colors.text,
  },
  loginText: { marginTop: 16, textAlign: "center", color: Colors.text },
  link: { color: Colors.primary, fontWeight: "500" },
});
