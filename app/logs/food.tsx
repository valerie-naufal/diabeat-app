import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { Logo } from "../../constants/Logo";
import HeaderBlue from "../../components/HeaderBlue";
import ScreenWrapper from "@/components/ScreenWrapper";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import { useEffect, useState } from "react";

interface FoodLog {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  meal: string;
  date: any;
}

export default function FoodLogsScreen() {
  const router = useNavigation();
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLogs = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "foodLogs"),
      where("user", "==", user.uid),
      orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<FoodLog, "id">),
    }));

    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const totalCalories = logs.reduce(
    (acc, item) => acc + (item.calories ?? 0),
    0
  );

  const totalCarbs = logs.reduce((acc, item) => acc + (item.carbs ?? 0), 0);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLogs();
    setRefreshing(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this food log?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "foodLogs", id));
              fetchLogs();
            } catch (error) {
              console.error("Error deleting log:", error);
              Alert.alert(
                "Error",
                "Failed to delete the log. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Top Banner */}
        <View style={styles.banner}>
          <HeaderBlue></HeaderBlue>
          <View style={styles.bannerFooter}>
            <TouchableOpacity onPress={() => router.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.bannerTitle}>Food</Text>
            <View style={{ width: 24 }} /> {/* Spacer */}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {/* Food List */}
          <FlatList
            data={logs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <View>
                  <Text style={styles.label}>{item.meal || "Meal"}</Text>
                  <Text style={styles.sub}>
                    {item.name || ""} - {item.calories ?? 0} kcal
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text>No food logs found.</Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total Calories: {totalCalories} kcal</Text>
          <Text style={styles.total}>Total Carbs: {totalCarbs} g</Text>
        </View>

        {/* Total */}
      </View>
    </ScreenWrapper>
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
