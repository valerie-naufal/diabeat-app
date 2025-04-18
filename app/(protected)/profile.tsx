import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Header from "../../components/Header";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";

export default function ProfileScreen() {
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err: any) {
      alert("Logout failed: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header></Header>

      {/* Avatar */}
      <Image
        source={require("../../assets/icons/profile.svg")}
        style={styles.avatar}
      />
      <View style={styles.nameRow}>
        <Text style={styles.name}>
          {profile?.fullName}
        </Text>
        <Ionicons name="pencil-outline" size={20} color={Colors.primary} />
      </View>

      {/* Details */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>UID: </Text>
          {user?.uid}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Email:</Text>
          {user?.email || "Not available"}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Phone Number:</Text>{" "}
          {profile?.phone || "Not available"}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Language:</Text> English
        </Text>
      </View>

      {/* Navigation buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile/health-data")}
      >
        <Text style={styles.buttonText}>Health Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile/device")}
      >
        <Text style={styles.buttonText}>My Device</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  icon: { width: 28, height: 28, resizeMode: "contain" },
  greeting: { color: Colors.primary, fontWeight: "600" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  name: { fontSize: 20, fontWeight: "600", color: Colors.primary },
  infoBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontWeight: "600",
    color: Colors.primary,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  bold: { fontWeight: "bold", color: Colors.primary },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
