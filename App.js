import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, ScrollView, TextInput, Picker, Button } from 'react-native';
import SubjectItem from './subject-item';

export default function App() {

  const [nameLogin, setNameLogin] = useState("");
  const [AgeLogin, setAgeLogin] = useState("");

  const userProfile = [
    {
      thumbnail: 'https://sachvui.com/cover/2018/nang-dau-cuc-pham.jpg',
      name: 'Nàng Dâu Cực Phẩm',
      category: 'Love Story',
      total_chapters: 4,
      is_full: true,
    },
    {
      thumbnail: 'https://i.pinimg.com/564x/13/9d/14/139d1423077198de3edf6832e6e6a473.jpg',
      name: 'Doremon',
      category: 'Comic',
      total_chapters: 20,
      is_full: false,
    },
    {
      thumbnail: 'https://i.pinimg.com/564x/df/98/48/df98487bb74128cb2a50e3c7fff136c9.jpg',
      name: 'Tom and Jerry',
      category: 'Cartoon',
      total_chapters: 35,
      is_full: true,
    },
    {
      thumbnail: 'https://img.webtruyen.com/public/images/medium/sieuphamvususrbPbCpFIP.jpg',
      name: 'Siêu phẩn vu sư ',
      category: 'Truyện ma',
      total_chapters: 1,
      is_full: false,
    }
    ,
    {
      thumbnail: 'https://img.webtruyen.com/public/images/medium/tongtaicaolanhtuyetsungcuoicungcungdenemi2q1cigrfP.jpg',
      name: 'Tu chân tứ vạn niên',
      category: 'Huyền giới',
      total_chapters: 9,
      is_full: true,
    }
    ,
    {
      thumbnail: 'https://img.webtruyen.com/public/images/medium/tuchantuvannienGYIi1tj3Sr.jpg',
      name: 'Vô tiên',
      category: 'Tiên hiệp',
      total_chapters: 6,
      is_full: true,
    }
    ,
    {
      thumbnail: 'https://img.webtruyen.com/public/images/medium/maosontrocquynhanYmRdo2qcN4.jpg',
      name: 'Lực thiên quý vip',
      category: 'Kiếp hiệp',
      total_chapters: 3,
      is_full: false,
    }
  ];

  const [user, setUser] = useState(userProfile);
  const [showModal, setShowModal] = useState(true);
  const [login, setLogin] = useState(false);

  const handleDeleteSubject = (name) => {

    let newUser = user;

    newUser = newUser.filter((userProfile) => userProfile.name != name);
    setUser(newUser);
  }

  const checkLogin = () => {

    if (nameLogin == '') {
      alert('Empty Name');

    }else if(!isNaN(nameLogin)){
      alert(" Please input text");
    }
    else if (AgeLogin == '') {
      alert('Empty Age');

    } else if (AgeLogin < 18) {

      alert('Your age must be bigger than 18');

    } else if (isNaN(AgeLogin)) {

      alert(" Please input number");
    }
    else {
      setLogin(true);
      setShowModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textNameLogin}>Hello: {nameLogin}</Text>
      <FlatList
        data={user}
        renderItem={({ item }) => (
          <SubjectItem item={item} handleDelete={handleDeleteSubject} />
        )}
        keyExtractor={(item, index) => index}

      />
      <Modal visible={showModal} >
        <ScrollView >


          <View style={styles.modal}>
            <Text style={styles.text} >INPUT INFORMATION</Text>
            <Text style={styles.textModal} >Name:</Text>
            <TextInput placeholder="Input your Name" style={styles.input2} onChangeText={(valueName) => setNameLogin(valueName)} />

            <Text style={styles.textModal} >Age:</Text>
            <TextInput placeholder='Input your Age' style={styles.input} onChangeText={(AgeLogin) => setAgeLogin(AgeLogin)} />

            <Button
              color="#FF3300"
              title="Reading"
              onPress={() => checkLogin()}
            />


          </View>
        </ScrollView>

      </Modal>
    </View>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33FF99',
    marginTop: 30
  },
  textNameLogin: {
    marginTop: 5,
   
    fontSize: 23,
    fontWeight: 'bold',
    textAlign:"center",
  },
  textModal: {
    padding: 8,
    margin: 5,
    fontWeight:"bold",
  },
  modal: {
    flex: 1,
    backgroundColor: '#66FF66',
  },
  text: {
    fontSize: 27,
    color: 'red',
    textAlign: 'center',
    marginTop: 150,
    marginBottom:50,
    fontWeight:"bold",
  },
  input: {
    height: 40, borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 15, padding: 5, marginBottom:200,

  },
  input2: {
    height: 40, borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 15, padding: 5, 

  },



});
