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

const data = {
  type: "1",
  bloodType: "A+",
  height: "180 cm",
  weight: "100 Kg",
  emergency1: "",
  emergency2: "",
};

export default function HealthDataScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/icons/logo.png")}
          style={styles.icon}
        />
      </View>

      {/* Avatar */}
      <Image
        source={require("../../assets/icons/profile.svg")}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>

      {/* Data */}
      <View style={styles.info}>
        <Text>
          <Text style={styles.bold}>Type:</Text> {data.type}
        </Text>
        <Text>
          <Text style={styles.bold}>Blood Type:</Text> {data.bloodType}
        </Text>
        <Text>
          <Text style={styles.bold}>Height:</Text> {data.height}
        </Text>
        <Text>
          <Text style={styles.bold}>Weight:</Text> {data.weight}
        </Text>
        <Text>
          <Text style={styles.bold}>Emergency Contact #1:</Text>{" "}
          {data.emergency1}
        </Text>
        <Text>
          <Text style={styles.bold}>Emergency Contact #2:</Text>{" "}
          {data.emergency2}
        </Text>
      </View>

      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between" },
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
  },
  info: { marginTop: 20, gap: 8 },
  bold: { fontWeight: "bold", color: Colors.primary },
  back: { marginTop: 24, alignSelf: "flex-start" },
});
