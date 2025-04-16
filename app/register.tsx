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

export default function RegisterScreen() {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords don't match.");
      return;
    }

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    try {
      await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      router.replace("/dashboard");
    } catch (err: any) {
      alert("Registration failed: " + err.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <InputField
        placeholder="Full Name"
        value={fullName}
        onChangeText={setName}
      />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <InputField
        placeholder="Confirm Password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <ActionButton title="Register" onPress={handleRegister} />

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
