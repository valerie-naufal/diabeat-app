import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import HeaderBlue from "@/components/HeaderBlue";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";

interface GlucoseLog {
  id: string;
  value: number;
  timestamp: any;
}

const getColorForValue = (value: number) => {
  if (value > 200) return "#E53935"; // red
  if (value >= 150 && value <= 200) return "#FBC02D"; // yellow
  if (value >= 70 && value < 150) return "#43A047"; // green
  return "#FBC02D"; // yellow for < 70
};

export default function GlucoseLogsScreen() {
  const router = useRouter();
  const [logs, setLogs] = useState<GlucoseLog[]>([]);
  const user = auth.currentUser;
  console.log(user?.uid);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;

      const q = query(
        collection(db, "glucoseLogs"),
        where("user", "==", user?.uid),
        orderBy("timestamp", "desc")
      );

      try {
        const querySnapshot = await getDocs(q);
        const data: GlucoseLog[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<GlucoseLog, "id">),
        }));
        setLogs(data);
      } catch (err: any) {
        console.error("Firestore error:", err.message);
      }
    };

    fetchLogs();
  }, []);

  return (
    <ScreenWrapper>
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
          data={logs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp.toDate()).toLocaleString()}
              </Text>
              <Text style={styles.value}>{item.value} mg/dL</Text>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getColorForValue(item.value) },
                ]}
              />
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", },
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
  card: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: { color: Colors.primary, fontSize: 14 },
  value: { color: Colors.primary, fontWeight: "600", fontSize: 16 },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
