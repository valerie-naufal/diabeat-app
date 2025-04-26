import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ActionButton from "@/components/ActionButton";
import ScreenWrapper from "@/components/ScreenWrapper";

const device = {
  number: "HSUW34WHW",
  status: "Connected",
};

export default function DeviceScreen() {
  const router = useRouter();
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
    <ScreenWrapper>
      <View style={styles.container}>
        <Header></Header>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/icons/profile.svg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile?.fullName}</Text>

        <Text style={styles.label}>
          <Text style={styles.bold}>Device Number:</Text> {device.number}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Connection:</Text>{" "}
          <Text style={{ color: "green" }}>{device.status}</Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.buttonText}>Coonnect Device</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 40 },
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
    marginBottom: 20,
  },
  label: { fontSize: 16, marginBottom: 8 },
  bold: { fontWeight: "bold", color: Colors.primary },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  back: { marginTop: 24, alignSelf: "flex-start" },
});
