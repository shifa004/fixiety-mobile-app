import {
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "./config";
import { ScreenHeight } from "@rneui/base";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Register = ({ navigation }) => {
  useEffect(() => setSignedIn(false), []);

  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLast] = useState("");
  const [firstName, setFirst] = useState("");

  const handleRegister = () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        const userId = user.uid;

        const docRef = doc(db, "accounts", userId);
        await setDoc(
          docRef,
          { username: username, email: email, filename:"", gender: "", firstName: firstName, lastName: lastName },
          { merge: true }
        )
          .then(() => {
            console.log("data submitted");
          })
          .catch((error) => {
            console.log(error.message);
          });

        console.log("registered");
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error.message));
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/register.png")}
          style={styles.headerGraphic}
        />
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>by creating a free account.</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => {
            setFirst(text);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => {
            setLast(text);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Userame"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already a member?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}> Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: screenHeight * 0.02,
  },
  headerGraphic: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.8,
  },
  title: {
    fontSize: screenWidth * 0.07,
    fontWeight: "bold",
    color: "#01377D",
  },
  subtitle: {
    fontSize: screenWidth * 0.04,
    color: "#666",
  },
  input: {
    backgroundColor: "#fff",
    fontSize: screenWidth * 0.04,
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.015,
    borderRadius: 10,
    marginTop: screenHeight * 0.02,
  },
  inputContainer: {
    width: screenWidth * 0.8,
    marginBottom: screenHeight * 0.04,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.02,
  },
  footerText: {
    color: "#666",
    fontSize: screenWidth * 0.035,
  },
  loginText: {
    color: "#01377D",
    fontWeight: "bold",
    fontSize: screenWidth * 0.035,
  },
  button: {
    width: screenWidth * 0.8,
    alignItems: "center",
    backgroundColor: "#01377D",
    borderRadius: 10,
    padding: screenWidth * 0.035,
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    fontSize: screenWidth * 0.04,
  },
});
