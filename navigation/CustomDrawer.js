/** @format */

import React , {useState} from "react";
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

import Animated from "react-native-reanimated";
import {connect} from "react-redux";
import { setSelectedTab } from "../stores/tab/tabActions";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon, isFocused,onPress}) => {
  return (
 <TouchableOpacity onPress = {onPress} style = {{ flexDirection : "row", justifyContent: "center",  height :40, marginBottom : SIZES.base, alignItems : "center", paddingLeft: SIZES.radius, borderRadius : SIZES.base, backgroundColor: isFocused ? COLORS.transparentBlack1:null }}>
  <Image source = {icon} style = {{width : 20 , height : 20, tintColor : COLORS.white, justifyContent: "center" }}></Image>
  <Text style = {{marginLeft : 15, color :  COLORS.white , ...FONTS.h3}}>{label} </Text>
 </TouchableOpacity>
  )
} 

const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab }) => {
  return (
    <DrawerContentScrollView scrollEnabled={true}>
      <View style = {{flex : 1, paddingHorizontal : SIZES.radius}}>
        <View style={{ flexDirection: "row", alignItems: "flex-start"}}>
          <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" } } onPress={() => navigation.closeDrawer()} >
            <Image source={icons.cross} style={{ height: 35, width: 35, tintColor: COLORS.white }}/>
          </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => console.log("profile") } style = {{flexDirection : "row", alignContent :"center", justifyContent:"center"}}>
            <Image  source={dummyData.myProfile?.profile_image} style={{ height: 50, width: 50, borderRadius: SIZES.radius }} />
          
           <View style = {{marginLeft: SIZES.radius}}> 
             
             <Text style={{ color: COLORS.white, ...FONTS.h3 }}> {dummyData.myProfile?.name} </Text>
             <Text style={{ color: COLORS.white, ...FONTS.body4 }}> View your profile </Text>
        </View>
        </TouchableOpacity> 
      </View>
      <View style = {{  marginTop : SIZES.padding, flexDirection: "column", alignItems: "flex-start" }}> 
      <CustomDrawerItem  label = {constants.screens.home} icon = {icons.home} isFocused = {selectedTab == constants.screens.home} 
      onPress = {()=>{setSelectedTab(constants.screens.home) 
                      navigation.navigate("mainLayout") }} />
      <CustomDrawerItem  label = {constants.screens.my_wallet} icon = {icons.wallet}/>
      <CustomDrawerItem  label = {constants.screens.notification} icon = {icons.notification}/>
      <CustomDrawerItem  label = {constants.screens.favourite} icon = {icons.favourite}/>
      <View style = {{  height: 1, backgroundColor: 'rgba(255, 255, 255 ,0.5)', alignSelf: 'stretch',marginVertical: 20 }}/> 
      <CustomDrawerItem  label = "Track Your Order" icon = {icons.location}/>
      <CustomDrawerItem  label = "Coupons" icon = {icons.coupon}/>
      <CustomDrawerItem  label = "Settings" icon = {icons.setting}/>
      <CustomDrawerItem  label = "Invite a Friend" icon = {icons.profile}/>
      <CustomDrawerItem  label = "Help Center" icon = {icons.help}/>
      </View>
      <View style = {{flexDirection : 'row', justifyContent : 'flex-start', alignItems : "center", marginTop : 50}}>
      <CustomDrawerItem  label = "Logout" icon = {icons.logout}/>
      </View>
      </View>
    </DrawerContentScrollView>
  );
};
const CustomDrawer = ({selectedTab,setSelectedTab}) => {
  const [progress, setProgress] = useState(new Animated.Value(0))
  
  const scale = Animated.interpolateNode(progress, {
    inputRange : [0,1],
    outputRange : [1,0.8]
  })
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange : [0, 1],
    outputRange : [0, 26]
  })
  const animatedStyle = {borderRadius, transform: [{scale}]}
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
          setTimeout (()=> {
           setProgress(props.progress) 
          },0)
          return (
          <CustomDrawerContent navigation={props.navigation}
          selectedTab = {selectedTab}
          setSelectedTab = {setSelectedTab}
          />
          )
        }}
      >
        <Drawer.Screen name="MainLayout">
          {props => <MainLayout {...props} drawerAnimationStyle = {animatedStyle} />}
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


function mapStateToProps (state) {

  return {
    selectedTab : state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => { return dispatch
       (setSelectedTab(selectedTab)) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)
(CustomDrawer)