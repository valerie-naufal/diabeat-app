import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <InputField placeholder="Email" />
      <InputField placeholder="Password" secureTextEntry />

      <ActionButton
        title="Login"
        onPress={() => console.log("Logging in...")}
      />

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.link}>Sign up</Text>
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
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 32,
    textAlign: "center",
  },
  signupText: { marginTop: 16, textAlign: "center" },
  link: { color: "#1C79E9", fontWeight: "500" },
});
