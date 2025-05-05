import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import ScreenWrapper from "@/components/ScreenWrapper";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Logs">;
const router = useNavigation<NavigationProp>();

export default function LogsScreen() {
  const cards = [
    {
      label: "Food",
      route: "Food",
      image: require("../../assets/images/food-bg.jpg"),
    },
    {
      label: "Glucose",
      route: "Glucose",
      image: require("../../assets/images/glucose-bg.jpg"),
    },
    {
      label: "Insulin",
      route: "Insulin",
      image: require("../../assets/images/insulin-bg.jpg"),
    },
  ] as const;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header></Header>

        {cards.map((card) => (
          <TouchableOpacity
            key={card.label}
            onPress={() => router.navigate(card.route)}
            style={styles.cardWrapper}
          >
            <ImageBackground
              source={card.image}
              style={styles.cardImage}
              imageStyle={{ borderRadius: 16, resizeMode: "cover" }}
            >
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(180, 210, 255, 0.4)",
                  "rgba(180, 210, 255, 0.8)",
                ]}
                style={styles.overlay}
              >
                <Text style={styles.label}>{card.label}</Text>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    backgroundColor: "#fff",
    gap: 16,
    overflowY: "scroll",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  cardWrapper: {
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  overlay: {
    height: "100%",
    justifyContent: "flex-end",
    padding: 16,
    borderRadius: 16,
  },
  label: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
});
