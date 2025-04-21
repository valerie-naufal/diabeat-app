import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { auth } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { updateDoc } from "firebase/firestore";
import FormWrapper from "@/components/FormWrapper";

export default function HealthDataScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [diabetesType, setDiabetesType] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [emergency, setEmergency] = useState("");

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        diabetesType,
        height,
        weight,
        emergency,
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
        setDiabetesType(data.diabetesType || "");
        setHeight(data.height || "");
        setWeight(data.weight || "");
        setEmergency(data.emergency || "");
      }
    };

    fetchProfile();
  }, []);

  return (
    <FormWrapper>
      <View style={styles.container}>
        {/* Header */}
        <Header></Header>
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>

        {/* Avatar */}
        <Image
          source={require("../../assets/icons/profile.svg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile?.fullName}</Text>

        {/* Data */}
        <View style={styles.info}>
          <Text style={styles.bold}>Diabetes Type:</Text>
          {editMode ? (
            <TextInput
              value={diabetesType}
              onChangeText={setDiabetesType}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{diabetesType || "Not available"}</Text>
          )}

          <Text style={styles.bold}>Blood Type:</Text>
          {editMode ? (
            <TextInput
              value={bloodType}
              onChangeText={setBloodType}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>
              {profile?.bloodType || "Not available"}
            </Text>
          )}

          <Text style={styles.bold}>Height:</Text>
          {editMode ? (
            <TextInput
              value={height}
              onChangeText={setHeight}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>
              {profile?.height || "Not available"}
            </Text>
          )}

          <Text style={styles.bold}>Weight:</Text>
          {editMode ? (
            <TextInput
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>
              {profile?.weight || "Not available"}
            </Text>
          )}

          <Text style={styles.bold}>Emergency Contact:</Text>
          {editMode ? (
            <TextInput
              value={emergency}
              onChangeText={setEmergency}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>
              {profile?.emergency || "Not available"}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => (editMode ? handleSave() : setEditMode(true))}
          style={styles.editButton}
        >
          <Text style={styles.editText}>{editMode ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
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
  bold: { fontWeight: "bold", color: Colors.primary, fontSize: 16 },
  back: { marginTop: 24, alignSelf: "flex-start" },
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
    marginTop: 20,
    width: "10%",
  },
  editText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
