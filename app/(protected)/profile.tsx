import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Header from "../../components/Header";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { updateDoc } from "firebase/firestore";
import ActionButton from "@/components/ActionButton";
import FormWrapper from "@/components/FormWrapper";

export default function ProfileScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const [profile, setProfile] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        email,
        phone,
      });

      setEditMode(false);
      alert("Profile updated!");
    } catch (err: any) {
      alert("Failed to update: " + err.message);
    }
  };

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

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setEmail(data.email || "");
        setPhone(data.phone || "");
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
    <FormWrapper>
      <View style={styles.container}>
        {/* Header */}
        <Header></Header>

        {/* Avatar */}
        <Image
          source={require("../../assets/icons/profile.svg")}
          style={styles.avatar}
        />
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profile?.fullName}</Text>
        </View>

        {/* Details */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.label}>UID: </Text>
            {user?.uid}
          </Text>
          <Text style={styles.label}>Email:</Text>
          {editMode ? (
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{user?.email || "Not available"}</Text>
          )}

          <Text style={styles.label}>Phone Number:</Text>
          {editMode ? (
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>
              {profile?.phone || "Not available"}
            </Text>
          )}

          <Text style={styles.infoText}>
            <Text style={styles.label}>Language:</Text> English
          </Text>
        </View>
        <View style={styles.buttonSection}>
          <ActionButton
            title="Health Info"
            onPress={() => router.push("/profile/health-data")}
          ></ActionButton>

          <ActionButton
            title="My Device"
            onPress={() => router.push("/profile/device")}
          ></ActionButton>

          <TouchableOpacity
            onPress={() => (editMode ? handleSave() : setEditMode(true))}
            style={styles.editButton}
          >
            <Text style={styles.editText}>{editMode ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FormWrapper>
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
    fontSize: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  bold: { fontWeight: "bold", color: Colors.primary },
  logoutSection: { alignItems: "center" },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  value: { fontSize: 16 },
  editButton: {
    backgroundColor: "#5286ff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
    width: "30%",
  },
  editText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
