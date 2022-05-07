/** @format */

import React from "react";
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MainLayout } from "../screens";
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  dummyData,
} from "../constants";

const Drawer = createDrawerNavigator();


const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView scrollEnabled={true} contentContainerStyle={{ flex: 1 }}>
      <View style = {{flex : 1, paddingHorizontal : SIZES.radius}}>
        <View style={{ alignItems: "flex-start", justifyContent: "center"}}>
          <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" } } onPress={() => navigation.closeDrawer()} >
            <Image source={icons.cross} style={{ height: 35, width: 35, tintColor: COLORS.white }}/>
          </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => console.log("profile") } style = {{}}>
            <Image  source={dummyData.myProfile?.profile_image} style={{ height: 50, width: 50, borderRadius: SIZES.radius }} />
          </TouchableOpacity>
           <View style = {{marginLeft: SIZES.radius}}> 
             
             <Text style={{ color: COLORS.white, ...FONTS.h3 }}> {dummyData.myProfile?.name} </Text>
             <Text style={{ color: COLORS.white, ...FONTS.body4 }}> View your profile </Text>
        </View>
      </View>
      </View>
    </DrawerContentScrollView>
  );
};
const CustomDrawer = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <Drawer.Navigator
          drawerType="slide" 
          overlayColor="transparent" 
          drawerStyle={{
          flex: 1,
          width: "65%",
          paddingRight : 20,
          backgroundColor: "transparent",
        }}
        sceneContainerStyle={{
          backgroundColor: "transparent",
}}
        initialRouteName="MainLayout"
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
      >
        <Drawer.Screen name="MainLayout">
          {props => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
     </View>
  );
};
const styles = StyleSheet.create({
  name: {
    flexDirection: "row",
    marginLeft: SIZES.radius,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer : {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width : '100%',
    marginLeft : 5,
    marginTop : 15
  },
  headerName : {
width : "100%"

  }
});
export default CustomDrawer;
