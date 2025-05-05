import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from "react-native-image-picker";
import api from "../components/api";
import axios from "axios";

export default function ModalSearchScreen() {
  const router = useNavigation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [nutritionalInfo, setNutritionalInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl`,
        {
          params: {
            search_terms: searchQuery,
            search_simple: 1,
            action: "process",
            json: 1,
          },
        }
      );

      setSearchResults(response.data.products || []);
    } catch (error) {
      console.error("Search error:", error);
      Alert.alert("Search failed", "Could not fetch food data.");
    }
  };

  const onSelectImage = async () => {
    Alert.alert("Select Image", "Choose an option", [
      { text: "Camera", onPress: pickFromCamera },
      { text: "Gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const pickFromCamera = async () => {
    const options: CameraOptions = {
      mediaType: "photo",
      cameraType: "back",
      quality: 1,
    };

    launchCamera(options, (response) => {
      handleImageResponse(response.assets);
    });
  };

  const pickFromGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      handleImageResponse(response.assets);
    });
  };

  const handleImageResponse = (assets?: Asset[]) => {
    if (!assets || assets.length === 0) return;

    const uri = assets[0].uri;
    if (uri) {
      setImageUri(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", {
        uri,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);

      const uploadRes = await api.post(
        "image/segmentation/complete",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageId = uploadRes.data.imageId;

      const nutritionRes = await api.post("recipe/nutritionalInfo", {
        imageId,
      });

      setNutritionalInfo(nutritionRes.data);
      console.log("Nutrition Info:", nutritionRes.data);
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert("Upload failed", "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header></Header>
      <TouchableOpacity onPress={() => router.goBack()} style={styles.back}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={Colors.primary} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.primary}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
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

      {searchResults.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Search Results:
          </Text>
          {searchResults.slice(0, 10).map((item, idx) => (
            <View key={idx} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: "600" }}>
                {item.product_name || "Unnamed food"}
              </Text>
              <Text style={{ fontSize: 12, color: "#555" }}>
                Brand: {item.brands || "N/A"}
              </Text>
            </View>
          ))}
        </View>
      )}
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
  back: { marginTop: 14, marginBottom: 14, alignSelf: "flex-start" },
});
