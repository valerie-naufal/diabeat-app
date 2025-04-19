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
import HeaderBlue from "@/components/HeaderBlue";

const glucoseLogs = [
  { id: "1", value: 100, status: "normal" },
  { id: "2", value: 103, status: "normal" },
  { id: "3", value: 98, status: "normal" },
  { id: "4", value: 300, status: "high" },
  { id: "5", value: 200, status: "elevated" },
  { id: "6", value: 100, status: "normal" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "normal":
      return "green";
    case "high":
      return "red";
    case "elevated":
      return "orange";
    default:
      return "gray";
  }
};

export default function GlucoseLogsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.banner}>
        <HeaderBlue></HeaderBlue>
        <View style={styles.bannerBottom}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Glucose</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={glucoseLogs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.timestamp}>2/23/25{"\n"}15:47:05</Text>
            <Text style={styles.value}>{item.value} mg/dL</Text>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  banner: {
    backgroundColor: Colors.primary,
    padding: 16,
    paddingTop: 40,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bannerTop: { flexDirection: "row", justifyContent: "space-between" },
  bannerBottom: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: { width: 28, height: 28, resizeMode: "contain" },
  greeting: { color: "#fff", fontWeight: "600" },
  title: { fontSize: 20, color: "#fff", fontWeight: "bold" },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
    paddingVertical: 16,
  },
  timestamp: { color: Colors.primary, fontSize: 14 },
  value: { color: Colors.primary, fontWeight: "600", fontSize: 16 },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
