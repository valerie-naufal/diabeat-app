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
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import { useEffect, useState } from "react";

interface InsulinLog {
  id: string;
  value: number;
  type: string;
  timestamp: any;
}

export default function InsulinLogsScreen() {
  const router = useRouter();
  const [logs, setLogs] = useState<InsulinLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "insulinLogs"),
        where("user", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<InsulinLog, "id">),
      }));

      setLogs(data);
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
            <Text style={styles.title}>Insulin</Text>
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
              <Text style={styles.value}>
                {item.value} unit{item.value > 1 ? "s" : ""}
              </Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
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
  card: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  type: { color: Colors.primary, fontSize: 14, fontWeight: "500" },
});
