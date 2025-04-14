import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const device = {
  number: "HSUW34WHW",
  status: "Connected",
};

export default function DeviceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/logo.png")}
        style={styles.icon}
      />

      <Image
        source={require("../../assets/icons/profile.svg")}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>

      <Text style={styles.label}>
        <Text style={styles.bold}>Device Number:</Text> {device.number}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Connection:</Text>{" "}
        <Text style={{ color: "green" }}>{device.status}</Text>
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Connect Device</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 40 },
  icon: { width: 28, height: 28, resizeMode: "contain" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 16,
  },
  name: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontSize: 16, marginBottom: 8 },
  bold: { fontWeight: "bold", color: Colors.primary },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  back: { marginTop: 24, alignSelf: "flex-start" },
});
