import { StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import { Card,Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import {ref, uploadBytesResumable} from 'firebase/storage'
import {doc, setDoc,getDocs, collection} from "firebase/firestore";
import {storage, db} from './config'

const Assignment4 = () => {

  const [name,setName] = useState()
  const [id,setId] = useState()
  const [image,setImage] = useState()
  const [fileName,setFileName]=useState()
  const [students, setStudents] = useState([])
    
  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.canceled) {
      console.log(result)
      setImage(result.assets[0].uri);
      setFileName(result.assets[0]. uri.substring(result.assets[0].uri.toString().lastIndexOf('/') + 1))
    }
  }
  
  const uploadImage = async () => {
    const imgRef = ref(storage, fileName)
    const img = await fetch(image)
    const bytes = await img.blob()
    await uploadBytesResumable(imgRef, bytes)
  }
   
  const set = async() => {
    const docRef = doc(db, "students", id)
    await store();
    await setDoc(docRef, { name: name, image: fileName}, {merge:true})
    .then(() => { console.log('data submitted') 
    setId('')
    setName('')
    setFileName('')})
    .catch((error) => { console.log(error.message) })  
  }
        
  const store = async()=>{
       await uploadImage();
  }
    
  const readAll = async () => {
    const docs = await getDocs(collection(db, "students"));
    const temp = [...students]
    docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots      
    const existingStudent = temp.find((student) => student.id === doc.id);
    if (!existingStudent) {
        console.log(doc.id, " => ", doc.data());
        // Add the new student to the newStudents array
        temp.push({ id: doc.id, name: doc.data().name });
    }
    })
    setStudents([...temp]);
  }
        
  return (
    <View style={styles.container}>
      <Card width={"80%"}>
        <Card.Title>ADD NEW STUDENTS</Card.Title>
        <Card.Divider />
        <TextInput placeholder='Name' style={styles.input} value={name} onChangeText={(text) => setName(text)} autoCorrect={false}/>
        <TextInput placeholder='ID' style={styles.input} value={id} autoCorrect={false} onChangeText={(text) => setId(text)}/>
        <TouchableOpacity onPress={pickImage}>
            <TextInput placeholder='Upload Picture' style={[styles.input,{width:200,color:'gray'}]} editable={false} value={fileName} />
        </TouchableOpacity>
        <Button color={'secondary'} style={{width:200}} onPress={set} > Add </Button>
      </Card>
      <Button color="primary" style={{marginTop:20}} onPress={() => readAll()} >Download my students' list</Button>
      <Card width={'80%'}>
        <Card.Title>STUDENTS LIST</Card.Title>
        <Card.Divider />
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <Text style={{fontWeight:'bold'}}>Student ID</Text>
          <Text style={{fontWeight:'bold'}}>Name</Text>
          <Text style={{fontWeight:'bold'}}>Picture</Text>
        </View>
        <Card.Divider />
        {students.map((x, i) => (
          <View key={x.id} style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>{x.id}</Text>
            <Text>{x.name}</Text>
            <Text>.jpg</Text>
          </View>
        ))}
      </Card>
    </View>
  )
}

export default Assignment4

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    flex:1
  },
  input:{
    marginBottom:10,
    fontSize:18,
    color: 'gray'
  }
})