import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: [55, 90, 60, 125, 70, 100],
    },
  ],
};

export default function DashboardDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
            onPress={() => router.back()}
          />
          <Text style={styles.headerText}>
            100 <Text style={styles.unit}>mg/dL</Text>
          </Text>
        </View>
        <Text style={styles.greeting}>Hi, John!</Text>
      </View>

      {/* Date Selector */}
      <View style={styles.dateRow}>
        <Ionicons name="chevron-back" size={20} color={Colors.primary} />
        <Text style={styles.dateText}>Today</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </View>

      {/* Chart */}
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => Colors.primary,
          labelColor: () => Colors.primary,
          strokeWidth: 2,
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 40 },
  header: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerText: { fontSize: 32, color: "#fff", fontWeight: "700" },
  unit: { fontSize: 14, fontWeight: "400" },
  greeting: { color: "#fff", fontSize: 14 },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
    marginBottom: 24,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
});
