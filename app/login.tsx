import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/dashboard");
    } catch (err: any) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <ActionButton title="Login" onPress={handleLogin} />

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
    backgroundColor: "fff",
    overflowY: "scroll"
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
