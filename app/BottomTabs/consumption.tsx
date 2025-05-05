import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function ConsumptionScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <Header></Header>

        {/* Insulin Bar */}
        <View style={styles.insulinSection}>
          <Image
            source={require("../../assets/icons/vial.png")}
            style={styles.vialImage}
          />
          <View>
            <Text style={styles.percentage}>65%</Text>
            <Text style={styles.amount}>3.7ml</Text>
            <Text style={styles.label}>Insulin</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bracelet Battery */}
        <View style={styles.deviceRow}>
          <Text style={styles.deviceLabel}>Bracelet</Text>
          <Image
            source={require("../../assets/icons/green-battery.png")}
            style={styles.batteryIcon}
          />
          <Text style={[styles.batteryText, { color: "green" }]}>75%</Text>
        </View>

        <View style={styles.divider} />

        {/* Belt Battery */}
        <View style={styles.deviceRow}>
          <Text style={styles.deviceLabel}>Belt</Text>
          <Image
            source={require("../../assets/icons/red-battery.png")}
            style={styles.batteryIcon}
          />
          <Text style={[styles.batteryText, { color: "red" }]}>18%</Text>
        </View>
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
    marginBottom: 20,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  greeting: {
    color: Colors.primary,
    fontWeight: "600",
  },
  insulinSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  vialImage: {
    width: 80,
    height: 140,
    resizeMode: "contain",
  },
  percentage: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
  },
  amount: {
    fontSize: 16,
    color: Colors.primary,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginVertical: 12,
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  deviceLabel: {
    flex: 1,
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "500",
  },
  batteryIcon: {
    width: 28,
    height: 18,
    resizeMode: "contain",
  },
  batteryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
