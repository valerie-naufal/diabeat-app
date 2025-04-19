import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Logo } from "../../constants/Logo";
import Header from "@/components/Header";

export default function LogsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header></Header>

      {/* Bubbles */}
      <View style={styles.bubbleContainer}>
        <TouchableOpacity
          style={styles.bubble}
          onPress={() => router.push("/logs/food")}
        >
          <Text style={styles.bubbleText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bubble}
          onPress={() => router.push("/logs/glucose")}
        >
          <Text style={styles.bubbleText}>Glucose</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bubble}
          onPress={() => router.push("/logs/insulin")}
        >
          <Text style={styles.bubbleText}>Insulin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  icon: {
    width: Logo.width,
    height: Logo.height,
    resizeMode: "contain",
  },
  greeting: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  bubbleContainer: {
    alignItems: "center",
    gap: 20,
  },
  bubble: {
    backgroundColor: Colors.primary,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
