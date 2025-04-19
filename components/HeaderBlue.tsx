import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export default function HeaderBlue() {
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
    <View style={styles.header}>
      <Image source={require("../assets/icons/logo.png")} style={styles.icon} />
      <Text style={styles.greeting}>
        Hi, <Text>{profile?.fullName || "Not available"}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: Colors.primary,
    alignItems:"center"
  },
  icon: { width: 50, height: 50, resizeMode: "contain",borderRadius:10 },
  greeting: { color: "white", fontWeight: "600", fontSize: 18 },
});
