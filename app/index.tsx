/* import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
} */

import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <InputField placeholder="Email" />
      <InputField placeholder="Password" secureTextEntry />

      <ActionButton
        title="Login"
        onPress={() => console.log("Logging in...")}
      />

      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.link}>Sign up</Text>
      </Text>
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
  },
  signupText: { marginTop: 16, textAlign: "center" },
  link: { color: "#1C79E9", fontWeight: "500" },
});
