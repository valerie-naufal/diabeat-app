import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { Logo } from "../../constants/Logo";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function DashboardScreen() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header></Header>

        {/* Blood Glucose Reading */}
        <View style={styles.glucoseContainer}>
          <Text style={styles.glucoseValue}>100</Text>
          <Text style={styles.unit}>mg/dL</Text>
        </View>

        {/* Date Bar */}
        <View style={styles.dateRow}>
          <Ionicons name="chevron-back" size={20} color={Colors.primary} />
          <Text style={styles.dateText}>Today</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </View>

        {/* Placeholder Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.fakeChartCircle} />
          <View style={styles.chartInfo}>
            <Text style={styles.label}>Calories</Text>
            <Text style={styles.value}>700</Text>
            <Text style={styles.label}>Carbs</Text>
            <Text style={styles.value}>12g</Text>
          </View>
        </View>

        {/* See More Button */}
        <TouchableOpacity
          style={styles.seeMore}
          onPress={() => router.push("/dashboard-details")}
        >
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 40,
    overflowY: "scroll",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  glucoseContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginVertical: 24,
    alignItems: "center",
    paddingVertical: 24,
  },
  glucoseValue: {
    fontSize: 72,
    fontWeight: "700",
    color: "#fff",
  },
  unit: {
    color: "#fff",
    fontSize: 16,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 24,
  },
  fakeChartCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: Colors.primary,
    opacity: 0.4,
  },
  chartInfo: {
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: Colors.primary,
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 8,
  },
  seeMore: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  seeMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    width: Logo.width,
    height: Logo.height,
    resizeMode: "contain",
  },
});
