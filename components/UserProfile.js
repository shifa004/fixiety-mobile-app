import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Button } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import {
  AntDesign,
  Entypo,
  Fontisto,
  Feather,
  FontAwesome5,
} from "react-native-vector-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { storage, db, auth } from "./config";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const UserProfiles = ({ route, navigation }) => {
  //const email = route.params.email;
  const [username, setUsername] = useState();
  const [picture, setPicture] = useState();
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState("");
  const [attached, setAttached] = useState(false);
  const [uid, setID] = useState();
  const [fname, setFname] = useState();
  const [gender, setGender] = useState();
  const [url, setUrl] = useState();

  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
        setUsername(user.email);
        setID(user.uid);
        console.log(user);
        console.log("this is uiddddddddd", uid);
        console.log("this is emaaaaaail", username);
      } else {
        // No user is signed in
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  },);

  const getDetails = async () => {
    const q = query(collection(db, "accounts"), where("email", "==", username));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFname(doc.data().username);
      setGender(doc.data().gender ? doc.data().gender : "");
      setPicture(doc.data().filename ? doc.data().filename : "https://firebasestorage.googleapis.com/v0/b/myapp1-40822.appspot.com/o/profile.png?alt=media&token=47e24f6b-ffeb-43d3-bc75-d47facbd1746");
      console.log("this is genderrrr", gender);
      console.log("this is naaaameee", fname);
      console.log("tjos os pictureee", picture);
    });
  };

  const update = async () => {
    try {
    //   if (fileName != "") {
    //     await store();
    //   }

      const user = doc(db, "accounts", uid);
      const docSnap = await getDoc(user);

      const data = docSnap.data();

      await updateDoc(
        user,
        {
          email: currentUser.email,
          gender: gender,
          username: fname,
          filename: picture,
        },
        { merge: true }
      );

      alert("Information updated");
    } catch (error) {
      console.log(error);
    }

    getDetails();
  };

  const store = async () => {
    await uploadImage();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
      setFileName(
        result.assets[0].uri.substring(
          result.assets[0].uri.toString().lastIndexOf("/") + 1
        )
      );
      setAttached(true);
      await store();
    }
  };

  const uploadImage = async () => {
    const imgRef = ref(storage, fileName);
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytesResumable(imgRef, bytes).then(() =>
      console.log("uploaded")
    );
    await getDownloadURL(imgRef)
      .then(async(x) => {
        const user = doc(db, "accounts", uid);
        await updateDoc(
          user,
          {
            filename: x,
          },
          { merge: true }
        );
        setPicture(x)
      })
      .catch((e) => alert(e.message));
  };

  // color='#E0E0E0'
  // style={{ justifyContent: 'center', alignItems: 'center', marginTop: screenWidth * 0.07 }}
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 150 : -200}
    >
      <ScrollView>
        <TouchableOpacity onPress={pickImage} style={styles.header}>
        {url ? (
            <Avatar source={{ uri: url }} style={styles.image} />
          ) : (
            <Avatar
              source={require("../assets/profile.png")}
              size={screenWidth * 0.33}
              rounded
            />
          )}
          <Text style={{ color: "grey", marginTop: screenWidth * 0.03 }}>
            Click on the image to change
          </Text>
        </TouchableOpacity>

        <View style={styles.fields}>
          <View style={{ marginTop: screenWidth * 0.04 }}>
            <Fontisto name="email" size={25} color="#01377D" />
          </View>

          <Text
            style={{
              marginTop: screenWidth * 0.04,
              marginLeft: screenWidth * 0.05,
            }}
          >
            {username}
          </Text>
        </View>

        <View style={styles.fields}>
          <View style={{ marginTop: screenWidth * 0.04 }}>
            <Feather name="user" size={25} color="#01377D" />
          </View>

          <TextInput
            value={fname}
            style={styles.input}
            onChangeText={setFname}
          ></TextInput>
        </View>

        <View style={styles.fields}>
          <View
            style={{
              marginTop: screenWidth * 0.04,
              marginRight: screenWidth * 0.01,
            }}
          >
            <Fontisto name="transgender" size={25} color="#01377D" />
          </View>

          <Dropdown
            data={genders}
            placeholder="Select Gender"
            value={gender}
            labelField="label"
            valueField="value"
            style={[styles.input]}
            search
            selectedTextStyle={{ fontSize: 16 }}
            searchPlaceholder="Search..."
            onChange={(item) => {
              setGender(item.value);
            }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => update()} style={[styles.end]}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserProfiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: "#f2f5fa",

    //padding: 20,
  },
  fields: {
    //margin: 0.02*screenWidth,
    alignItems: "center",
    //justifyContent:'center',
    flexDirection: "row",
    marginLeft: screenWidth * 0.09,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  field: {
    fontSize: screenWidth * 0.04,
  },
  end: {
    // marginLeft: screenWidth * 0.04,
    height: screenWidth * 0.08,
    backgroundColor: "#01377D",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.3,
    marginTop: screenWidth * 0.07,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: screenWidth * 0.1,
    marginBottom: screenWidth * 0.07,
  },
  card: {
    borderRadius: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "black",
    width: screenWidth * 0.7,
    height: screenWidth * 0.1,
    padding: screenWidth * 0.02,
    // marginHorizontal: screenWidth * 0.04,
    marginTop: screenWidth * 0.04,
    marginLeft: screenWidth * 0.04,
  },
  button: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    // paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    // width: 'auto',
    margin: 5,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
  },
});