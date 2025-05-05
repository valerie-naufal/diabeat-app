import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types'; 

const options = [
  { label: "Breakfast", icon: require("../../assets/icons/breakfast.svg") },
  { label: "Lunch", icon: require("../../assets/icons/lunch.svg") },
  { label: "Dinner", icon: require("../../assets/icons/dinner.svg") },
  { label: "Snack", icon: require("../../assets/icons/snack.svg") },
  { label: "Scan", icon: require("../../assets/icons/scan.svg") },
  { label: "Measurements", icon: require("../../assets/icons/ruler.svg") },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Add">;
const router = useNavigation<NavigationProp>();

export default function AddScreen() {

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header></Header>

        <View style={styles.grid}>
          {options.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.item}
              onPress={() => router.navigate("ModalSearch")}
            >
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenWrapper>
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
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    paddingTop: 50,
  },
  item: {
    width: "45%",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 8,
    resizeMode: "contain",
  },
  label: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
});
