import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function ModalSearchScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [nutritionalInfo, setNutritionalInfo] = useState(null);

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

  const apiUserToken = "3ae08f9b9a648f458da07a7be4dfd24f640e3930"; // Replace with your real token
  const headers = { Authorization: `Bearer ${apiUserToken}` };

  const onSelectImage = async () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Camera", onPress: pickFromCamera },
      { text: "Gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const pickFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Camera permission is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadImage(uri);
    }
  };

  const pickFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Gallery permission is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const uploadResponse = await axios.post(
        "https://api.logmeal.com/v2/image/segmentation/complete",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiUserToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageId = uploadResponse.data.imageId;
      console.log("Image uploaded successfully:", uploadResponse.data);

      const nutritionalResponse = await axios.post(
        "https://api.logmeal.com/v2/recipe/nutritionalInfo",
        { imageId },
        { headers }
      );

      console.log("Nutritional Information:", nutritionalResponse.data);
      setNutritionalInfo(nutritionalResponse.data);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Upload failed", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <Header></Header>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={Colors.primary} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.primary}
          style={styles.searchInput}
        />
      </View>

      {/* Shortcuts */}
      <View style={styles.actions}>
        <View style={styles.action}>
          <Ionicons name="time-outline" size={30} color={Colors.primary} />
          <Text style={styles.actionLabel}>Recents</Text>
        </View>
        <TouchableOpacity onPress={onSelectImage}>
          <Ionicons name="barcode-outline" size={30} color={Colors.primary} />
          <Text style={styles.actionLabel}>Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 60,
    overflowY: "scroll",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "10%",
  },
  icon: { width: 50, height: 50, resizeMode: "contain" },
  greeting: { color: Colors.primary, fontWeight: "600", fontSize: 18 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: Colors.primary,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  action: {
    alignItems: "center",
  },
  actionLabel: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.primary,
  },
  back: { marginTop: 14, marginBottom: 14,alignSelf: "flex-start" },
});
