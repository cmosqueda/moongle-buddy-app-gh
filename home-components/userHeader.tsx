import { View, StyleSheet, Text } from "react-native";

type User = {
  username: string;
  level: number;
};

const DATA: User = { username: "jalanie", level: 3 };

export const UserHeader = () => {
  return (
    <>
      {/* parent container */}
      <View style={styles.parentView}>
        {/* icon view */}
        <View style={styles.iconView}>
          <View style={styles.icon}></View>

          <Text style={styles.levelLabel}>Level {DATA.level}</Text>
        </View>
        {/* text views */}
        <View style={styles.textsView}>
          {/* heading - name with greeting*/}
          <Text style={styles.heading}>Hi, {DATA.username}</Text>

          {/* subheading - catch phrase */}
          <Text style={styles.catchPhrase}>Let's review while having fun!</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    width: "85%",
    margin: 20,
    padding: 20,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // This controls the blur
    flexDirection: "column",
    alignItems: "center",
  },
  textsView: {
    alignItems: "center",
    marginVertical: 5,
  },
  heading: {
    fontFamily: "helvetica",
    fontSize: 24,
    fontWeight: "bold",
    color: "#3d3d3d",
    marginVertical: 5,
  },
  catchPhrase: {
    fontFamily: "helvetica",

    textAlign: "center",
  },
  iconView: {
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#4ecdc4",
    height: 80,
    width: 80,
    marginVertical: 5,
    borderRadius: 50,
  },
  levelLabel: {
    fontFamily: "helvetica",
  },
});
