import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import FormWrapper from "@/components/FormWrapper";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
  const router = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("Dashboard");
    } catch (err: any) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <FormWrapper>
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

        <TouchableOpacity onPress={() => router.push("Register")}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.link}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </FormWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "fff",
    overflowY: "scroll",
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
