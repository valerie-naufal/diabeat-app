import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";

export default function ModalSearchScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo.png")}
          style={styles.icon}
        />
        <Text style={styles.greeting}>Hi, John!</Text>
        <Ionicons
          name="close"
          size={24}
          color={Colors.primary}
          onPress={() => router.back()}
        />
      </View>

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
          <Ionicons name="time-outline" size={24} color={Colors.primary} />
          <Text style={styles.actionLabel}>Recents</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="barcode-outline" size={24} color={Colors.primary} />
          <Text style={styles.actionLabel}>Scan</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: { width: 28, height: 28, resizeMode: "contain" },
  greeting: { color: Colors.primary, fontWeight: "600", fontSize: 16 },
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
});
