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
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [emergency, setEmergency] = useState("");
  const [diabetesType, setDiabetesType] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
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

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      // Save extra info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        phone,
        emergency,
        diabetesType,
        bloodType,
        height,
        weight,
      });

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
      <InputField
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <InputField
        placeholder="Emergency Contact"
        value={emergency}
        onChangeText={setEmergency}
      />
      <InputField
        placeholder="Diabetes Type (1 or 2)"
        value={diabetesType}
        onChangeText={setDiabetesType}
      />
      <InputField
        placeholder="Blood Type"
        value={bloodType}
        onChangeText={setBloodType}
      />
      <InputField
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
      />
      <InputField
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
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
