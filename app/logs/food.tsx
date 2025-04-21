import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Logo } from "../../constants/Logo";
import HeaderBlue from "../../components/HeaderBlue";

const foodItems = [
  { id: "1", label: "Breakfast", item: "Cereal", calories: 200 },
  { id: "2", label: "Snack 1", item: "Banana", calories: 100 },
  { id: "3", label: "Lunch", item: "Pizza", calories: 550 },
  { id: "4", label: "Snack 2", item: "Almonds", calories: 100 },
  { id: "5", label: "Dinner", item: "Sandwich", calories: 200 },
];

export default function FoodLogsScreen() {
  const router = useRouter();

  const totalCalories = foodItems.reduce((acc, item) => acc + item.calories, 0);

  return (
    <View style={styles.container}>
      {/* Top Banner */}
      <View style={styles.banner}>
        <HeaderBlue></HeaderBlue>
        <View style={styles.bannerFooter}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.bannerTitle}>Food</Text>
          <View style={{ width: 24 }} /> {/* Spacer */}
        </View>
      </View>

      {/* Food List */}
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.sub}>
                {item.item} - {item.calories} kcal
              </Text>
            </View>
            <Ionicons name="trash-outline" size={24} color={Colors.primary} />
          </View>
        )}
      />

      {/* Total */}
      <Text style={styles.total}>Total: {totalCalories} kcal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", overflowY: "scroll" },
  banner: {
    backgroundColor: Colors.primary,
    padding: 16,
    paddingTop: 40,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bannerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerFooter: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: { width: Logo.width, height: Logo.height, resizeMode: "contain" },
  greeting: { color: "#fff", fontWeight: "600" },
  bannerTitle: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  itemRow: {
    backgroundColor: "#f5f8ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 16, fontWeight: "bold", color: Colors.primary },
  sub: { fontSize: 14, color: Colors.primary, marginTop: 4 },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "right",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
