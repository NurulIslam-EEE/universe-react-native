import React ,{useState} from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Pressable,
} from "react-native";
import PlanetHeader from "../components/planet-header";
import Text from "../components/text/text";
import { PLANET_LIST } from "../data/planet-list";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-web";


const PlanItem = ({ item }) => {
  const { name, color } = item;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { planet: item });
      }}
      style={styles.item}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={[styles.circle, { backgroundColor: color }]} />
        <Text preset="h4" style={styles.itemName}>
          {name}
        </Text>
      </View>

      <AntDesign name="right" size={24} color="white" />
    </Pressable>
  );
};

export default function Home({ navigation }) {
  const [list ,setList]=useState(PLANET_LIST)
  const renderItem = ({ item }) => {
    return <PlanItem item={item} />;
  };

const searchFilter=(text)=>{
  const filterList=PLANET_LIST.filter(item=>{
    const itemName=item.name.toLocaleLowerCase();
    const userTypedText=text.toLocaleLowerCase();
    return itemName.indexOf(userTypedText)>-1
  })
  setList(filterList)
}


  return (
    <SafeAreaView style={styles.container}>
      <PlanetHeader />
      <TextInput
        placeholder="Type the planet name"
        placeholderTextColor={colors.white}
        autoCorrect={false}
        style={styles.searchInput}
        onChangeText={(text)=>searchFilter(text)}
      />
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.name}
        data={list}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing[4],
  },
  itemName: {
    textTransform: "uppercase",
    marginLeft: spacing[4],
  },
  list: {
    padding: spacing[4],
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  separator: {
    borderBottomColor: colors.white,
    borderWidth: 0.5,
  },
  searchInput: {
    padding: spacing[4],
    color: colors.white,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    margin: spacing[5],
  },
});
