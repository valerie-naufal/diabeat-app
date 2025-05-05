import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: [55, 90, 60, 125, 70, 100],
    },
  ],
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "DashboardDetails">;
const router = useNavigation<NavigationProp>();

export default function DashboardDetailsScreen() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log("No profile found.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
            onPress={() => router.goBack()}
          />
          <Text style={styles.headerText}>
            100 <Text style={styles.unit}>mg/dL</Text>
          </Text>
        </View>
        <Text style={styles.greeting}>
          Hi, <Text>{profile?.fullName || "Not available"}</Text>
        </Text>
      </View>

      {/* Date Selector */}
      <View style={styles.dateRow}>
        <Ionicons name="chevron-back" size={20} color={Colors.primary} />
        <View style={styles.dateRowCenter}>
          <Ionicons
            name="calendar-outline"
            size={18}
            style={styles.icon}
          ></Ionicons>
          <Text style={styles.dateText}>Today</Text>
        </View>
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
  greeting: { color: "#fff", fontSize: 18, fontWeight: "600" },
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
  dateRowCenter: { flexDirection: "row",alignItems:"center" },
  icon:{color:Colors.primary,padding:5,cursor:"pointer"}
});
