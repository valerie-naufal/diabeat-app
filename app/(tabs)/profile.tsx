import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/icons/logo.png")}
          style={styles.icon}
        />
        <Text style={styles.greeting}>Hi, John!</Text>
      </View>

      {/* Avatar */}
      <Image
        source={require("../../assets/icons/profile.svg")} // replace with your profile placeholder
        style={styles.avatar}
      />
      <View style={styles.nameRow}>
        <Text style={styles.name}>John Doe</Text>
        <Ionicons name="pencil-outline" size={20} color={Colors.primary} />
      </View>

      {/* Details */}
      <View style={styles.info}>
        <Text>
          <Text style={styles.bold}>Email:</Text> John.doe@gmail.com
        </Text>
        <Text>
          <Text style={styles.bold}>Phone Number:</Text> +1 234 567 89
        </Text>
        <Text>
          <Text style={styles.bold}>Language:</Text> English
        </Text>
      </View>

      {/* Navigation buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile/health-data")}
      >
        <Text style={styles.buttonText}>Health Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile/device")}
      >
        <Text style={styles.buttonText}>My Device</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  icon: { width: 28, height: 28, resizeMode: "contain" },
  greeting: { color: Colors.primary, fontWeight: "600" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  name: { fontSize: 20, fontWeight: "600", color: Colors.primary },
  info: { gap: 8, marginBottom: 24 },
  bold: { fontWeight: "bold", color: Colors.primary },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
