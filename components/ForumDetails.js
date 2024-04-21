import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Card, Button } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import Tags from "./Tags";
import ForumReplies from "./ForumReplies";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  Timestamp,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { storage, db } from "./config";
import { set } from "firebase/database";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ForumDetails = ({ route, navigation }) => {
  const { email } = route.params;
  const [x, setX] = useState(route.params.x);
  const [data, setData] = useState(x);
  const [id, setID] = useState(data.id);
  const [username, setUsername] = useState("");
  useEffect(() => {
    getName();
    if (data.filename != "") {
      setFilename(data.filename);
      getFile();
    }
  });

  const [title, setTitle] = useState("Anxiety is very very bad");
  const [detail, setDetail] = useState(
    "My question is bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"
  );
  const [replies, setReplies] = useState(24);
  const [comment, setComment] = useState();
  const [picture, setPicture] = useState(require("../assets/icon.png"));
  const [filename, setFilename] = useState();
  const [Likecount, setLikecount] = useState(50);
  const [url, setUrl] = useState(null);

  const getName = async () => {
    const q = query(collection(db, "accounts"), where("email", "==", email));
    const docs = await getDocs(q);
    let x = "";
    docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      x = doc.data().username;
    });
    console.log(x);
    setUsername(x);
  };

  const getFile = async () => {
    const imgRef = ref(storage, filename);
    await getDownloadURL(imgRef)
      .then((x) => {
        setUrl(x);
      })
      .catch((e) => console.log(e.message));
  };

  const handlePost = async () => {
    try {
      const thread = doc(db, "threads", data.id);
      const docSnap = await getDoc(thread);
      if (docSnap.exists()) {
        console.log("exists");
        const threadData = docSnap.data();
        await updateDoc(thread, {
          replies: [
            ...(threadData.replies || []),
            {
              date: Timestamp.now(),
              likes: [],
              name: username,
              reply: comment,
            },
          ],
        });
        const t = doc(db, "threads", data.id);
        const up = await getDoc(t);
        const d = up.data();
        console.log(d);
        readall();
        setComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const readall = async () => {
    const q = query(collection(db, "threads"), where("id", "==", data.id));
    const docs = await getDocs(q);
    let x = "";
    docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const threadData = doc.data();
      const replies = threadData.replies;
      const timestamp = threadData.date;
      const dateObject = new Date(timestamp.seconds * 1000);
      const formattedDate = `${
        dateObject.getMonth() + 1
      }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
      threadData.date = formattedDate;
      const count = parseInt(data.replycount) + 1;
      const updated = {
        ...threadData,
        replycount: count.toString(),
      };
      console.log(updated);
      setData(updated);
    });
    console.log(data);
    //console.log(x)
    //setUsername(x)
  };
  return (
    // <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 100 : -200}
    >
      <ScrollView>
        <Card width={"90%"} containerStyle={styles.card}>
          <View style={styles.header}>
            <Avatar size={screenWidth * 0.15} rounded source={picture} />
            <View style={{ marginTop: 10 }}>
              <Text style={{ marginLeft: 20, fontWeight: "bold" }}>
                {data.username}
              </Text>
              <Text style={{ marginLeft: 20, color: "grey" }}>{data.date}</Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: screenWidth * 0.042,
              fontWeight: "bold",
              marginBottom: screenWidth * 0.03,
            }}
          >
            {data.title}
          </Text>
          <Text style={{ color: "grey" }}>{data.detail}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: screenWidth * 0.03,
              flexWrap: "wrap",
            }}
          >
            <View
              style={{ width: screenWidth, marginBottom: screenWidth * 0.03 }}
            >
              {url != null ? (
                <Image source={{ uri: url }} style={styles.image} />
              ) : (
                ""
              )}
            </View>

            {data.tags.map((x, i) => (
              <View key={i} style={{ margin: 5 }}>
                <Tags data={x} key={i} />
              </View>
            ))}
          </View>
        </Card>

        <Text
          style={{
            fontWeight: "bold",
            marginTop: screenWidth * 0.05,
            fontSize: screenWidth * 0.035,
            marginLeft: screenWidth * 0.04,
          }}
        >
          Replies ({data.replycount})
        </Text>

        {data.replies.map((x, i) => (
          //  console.log(x,i,id)
          // //dataconsole.log()
          <ForumReplies data={x} index={i} key={i} dID={id} email={email} />
        ))}
      </ScrollView>

      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          marginTop: screenWidth * 0.03,
        }}
      >
        <TextInput
          placeholder="Comment.."
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
        <TouchableOpacity onPress={() => handlePost()}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              marginLeft: screenWidth * 0.02,
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForumDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: "#f2f5fa",
    //padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    //alignItems:'center',
    marginBottom: 15,
  },
  card: {
    borderRadius: 10,
  },
  innerContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    width: screenWidth * 0.8,
    height: screenWidth * 0.1,
    padding: screenWidth * 0.02,
    marginHorizontal: screenWidth * 0.02,
  },
  buttonText: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});
