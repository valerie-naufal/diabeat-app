import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";

export default function LogsScreen() {
  const router = useRouter();

  const cards = [
    {
      label: "Food",
      route: "/logs/food",
      image: require("../../assets/images/food-bg.jpg"),
    },
    {
      label: "Glucose",
      route: "/logs/glucose",
      image: require("../../assets/images/glucose-bg.jpg"),
    },
    {
      label: "Insulin",
      route: "/logs/insulin",
      image: require("../../assets/images/insulin-bg.jpg"),
    },
  ] as const;

  return (
    <View style={styles.container}>
      <Header></Header>

      {cards.map((card) => (
        <TouchableOpacity
          key={card.label}
          onPress={() => router.push(card.route)}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    backgroundColor: "#fff",
    gap: 16,
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
