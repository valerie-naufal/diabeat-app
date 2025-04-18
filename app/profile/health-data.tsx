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
import { auth } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import Header from "@/components/Header";


export default function HealthDataScreen() {
  const router = useRouter();
  const user = auth.currentUser;
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
      <Header></Header>

      {/* Avatar */}
      <Image
        source={require("../../assets/icons/profile.svg")}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile?.fullName}</Text>

      {/* Data */}
      <View style={styles.info}>
        <Text>
          <Text style={styles.bold}>Type:</Text>{" "}
          {profile?.diabetesType || "Not available"}
        </Text>
        <Text>
          <Text style={styles.bold}>Blood Type:</Text>{" "}
          {profile?.bloodType || "Not available"}
        </Text>
        <Text>
          <Text style={styles.bold}>Height:</Text>{" "}
          {profile?.height || "Not available"}
        </Text>
        <Text>
          <Text style={styles.bold}>Weight:</Text>{" "}
          {profile?.weight || "Not available"}
        </Text>
        <Text>
          <Text style={styles.bold}>Emergency Contact #1:</Text>{" "}
          {profile?.emergency || "Not available"}
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
