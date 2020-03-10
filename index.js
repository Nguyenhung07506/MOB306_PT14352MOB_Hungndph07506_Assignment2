import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, ScrollView, TextInput, Button, Alert, } from 'react-native';
import { registerRootComponent } from 'expo';

function App() {
    const API = "http://5e5e0f32725f320014ed0fdb.mockapi.io/react/Assignmentdata"
    const fetchSubjects = () => {

        return fetch(
            API,
            {}
        ).then((reponse) => reponse.json())
            .then((reponseJson) => setSubject(reponseJson))
            .catch((error) => console.log(error));
    }

    useEffect(() => { fetchSubjects() },
        []
    )

    const checkLogin = () => {
        if (nameLogin == '') {
            alert('Empty Name');

        } else if (!isNaN(nameLogin)) {
            alert(" Please input text");
        }
        else if (yearOld == '') {
            alert('Empty Age');

        } else if (yearOld < 18) {

            alert('Your age must be bigger than 18');

        } else if (isNaN(yearOld)) {

            alert(" Please input number");
        }
        else {

            setShowModal(false);
        }
    };



    const putItem = () => {

        const subject = {
            thumbnail: thumbnail,
            name: name,
            category: category,
            total_chapters: total_chapters,
            is_full: is_full
        };

        fetch(
            `${API}/${id}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            }
        ).then((reponse) => { reponse.json() })
            .then(() => fetchSubjects())
            .catch(error => console.log('error', error))

    }




    const createItem = () => {

        const subject = {
            thumbnail: thumbnail,
            name: name,
            category: category,
            total_chapters: total_chapters,
            is_full: is_full
        };

        fetch(
            API,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            }
        ).then((reponse) => reponse.json())
            .then(() => fetchSubjects())
            .catch(error => console.log('error', error))




    }

    const handleDelete = (id) => {
        fetch(
            `${API}/${id}`,
            { method: 'DELETE' }
        ).then(() => fetchSubjects())

            .catch((error) => console.log(error))
    }

    const alertDelete = (identity, handleDelete) => {
        return Alert.alert(
            'Delete Story !!',
            `Do you want to delete ?`,
            [
                {
                    text: 'Yes',
                    onPress: () => { handleDelete(identity) }
                },
                {
                    text: 'No',
                    onPress: () => { }
                }
            ],
            { cancleable: false }
        )
    };

    const [id, setId] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [total_chapters, setTotal_chapters] = useState("");
    const [is_full, setIs_full] = useState("");

    const [nameLogin, setNameLogin] = useState("");
    const [yearOld, setYearOld] = useState();

    const [subject, setSubject] = useState([]);
    const [showModal, setShowModal] = useState(true);

    const [showModalDeltai, setShowModalDeltai] = useState(false);
    const [showModalEdit, setshowModalEdit] = useState(false);
    const [showModalCreat, setshowModalCreat] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textNameLogin}>Hello: {nameLogin}</Text>
            <Button color="#00CC00"
                style={styles.buttona}
                title="ADD"
                onPress={() => setshowModalCreat(true)}
            />
            <FlatList style={styles.flatlist}
                data={subject}
                renderItem={({ item }) => <View>
                    <Image
                        style={{ width: 120, height: 120, marginTop: 10 }}
                        source={{ uri: item.thumbnail }}
                    />
                    <Text style={{
                        fontSize: 15, padding: 5, fontSize: 20,
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: 'green'
                    }}> Name:{item.name}</Text>
                    <Text style={{ fontSize: 15, padding: 7 }}>Category: {item.category}</Text>
                    <Text style={{ fontSize: 15, padding: 7 }}>Total champter: {item.total_chapters}</Text>
                    <Text style={{ fontSize: 15, padding: 7 }}>Status: {item.is_full}</Text>
                    <Button

                        title="DETAIL"
                        onPress={() => {
                            setShowModalDeltai(true),
                                setThumbnail(item.thumbnail),
                                setName(item.name),
                                setCategory(item.category),
                                setTotal_chapters(item.total_chapters),
                                setIs_full(item.is_full)
                        }}
                    />

                    <Button
                        color="#FFCC00"
                        title="EDIT"
                        onPress={() => {
                            setshowModalEdit(true),
                                setId(item.id)
                            setThumbnail(item.thumbnail),
                                setName(item.name),
                                setCategory(item.category),
                                setTotal_chapters(item.total_chapters),
                                setIs_full(item.is_full)
                        }}

                    />

                    <Button
                        color="#FF0000"
                        title="DELETE"

                        onPress={
                            () => alertDelete(item.id, handleDelete)
                        }
                    />
                </View>}
            />

            <Modal visible={showModal} >
                <ScrollView>
                    <View style={styles.modal}>
                        <Text style={styles.text} >INPUT INFORMATION</Text>
                        <Text style={styles.textModal} >Name:</Text>
                        <TextInput placeholder="Input your Name" style={styles.inputname2} onChangeText={(valueName) => setNameLogin(valueName)} />

                        <Text style={styles.textModal} >Age:</Text>
                        <TextInput placeholder='Input your Age' style={styles.inputname} onChangeText={(yearOld) => setYearOld(yearOld)} />

                        <Button
                            color="#FF3300"
                            title="Reading"
                            onPress={() => checkLogin()}
                        />
                    </View>
                </ScrollView>

            </Modal>

            <Modal visible={showModalDeltai} >

                <ScrollView>

                    <View style={styles.row}>
                        <View>
                            <Image style={styles.image} source={{ uri: thumbnail }} />
                            <Text></Text>
                            <Text style={styles.styleNameText}>{`Story Name: ${name}`}</Text>
                            <Text></Text>
                            <Text style={styles.textStyle} >{`Category : ${category}`}</Text>
                            <Text></Text>
                            <Text style={styles.textStyle} >{`Total Chapters: ${total_chapters}`}</Text>
                            <Text></Text>

                            <Text>Status: {is_full}</Text>
                            <Text></Text>
                            <Button
                                title="Back"
                                onPress={() => setShowModalDeltai(false)}

                            />
                        </View>

                    </View>

                </ScrollView>

            </Modal>

            <Modal visible={showModalEdit} >

                <ScrollView>

                    <View style={styles.row}>
                        <View>
                            <Image style={styles.image} source={{ uri: thumbnail }} />
                            <TextInput onChangeText={text => setName(text)} style={styles.input}>{name}</TextInput>
                            <TextInput onChangeText={text => setCategory(text)} style={styles.input} >{category}</TextInput>
                            <TextInput onChangeText={text => setTotal_chapters(text)} style={styles.input} >{total_chapters}</TextInput>

                            <TextInput onChangeText={text => setIs_full(text)} style={styles.input}>{is_full}</TextInput>
                            <Button
                            color="#FF0000"
                                title="UPDATE"
                                onPress={() => {


                                    putItem(),
                                        setshowModalEdit(false)


                                }}

                            />
                            <Button
                                title="CANCEL"
                                onPress={() => setshowModalEdit(false)}

                            />
                        </View>

                    </View>

                </ScrollView>

            </Modal>

            <Modal visible={showModalCreat} >

                <ScrollView>

                    <View style={styles.row}>
                        <View>
                            <Text style={styles.txt} >ADD STORY</Text>

                            <TextInput placeholder='Input Thumbnail' onChangeText={text => setThumbnail(text)} style={styles.input}></TextInput>
                            <TextInput placeholder='Input Storyname' onChangeText={text => setName(text)} style={styles.input}></TextInput>
                            <TextInput placeholder='Input Category' onChangeText={text => setCategory(text)} style={styles.input} ></TextInput>
                            <TextInput placeholder='Input Total chapters' onChangeText={text => setTotal_chapters(text)} style={styles.input} ></TextInput>
                            <TextInput placeholder='Input Status (True or False)' onChangeText={text => setIs_full(text)} style={styles.input}></TextInput>
                            <Button
                            color="#FFCC00"
                                title="OK"

                                onPress={() => {
                                    createItem(),
                                        setshowModalCreat(false)

                                }}

                            />
                            <Text></Text>
                            <Button
                                title="Back"

                                onPress={() => setshowModalCreat(false)}

                            />
                        </View>

                    </View>

                </ScrollView>

            </Modal>

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {

        marginTop: 50,

    },
    row: {
        padding: 8,
        // flex: 1,
        marginTop: 50,
        alignItems: "center",
        justifyContent: 'center',


    },
    textNameLogin: {
        color: '#FF0000',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20,
        marginLeft: 5,
        marginTop: 10,
    },
    textModal: {
        padding: 8,
        margin: 10,
    },
    buttona: {
        width: 200,
        height: 50
    },
    modal: {
        flex: 1,
    },
    flatlist: {

        marginTop: 16,
    },
    text: {
        fontSize: 30,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,

    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 250,
        borderRadius: 100,
        marginBottom: 20

    },
    styleNameText: {
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "bold",
        color: 'green'
    },
    textStyle: {
        lineHeight: 20

    },
    textModal: {
        padding: 8,
        margin: 5,
        fontWeight: "bold",
    }, text: {
        fontSize: 27,
        color: 'red',
        textAlign: 'center',
        marginTop: 150,
        marginBottom: 50,
        fontWeight: "bold",
    }, inputname: {
        height: 40, borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 15, padding: 5, marginBottom: 200,

    },
    inputname2: {
        height: 40, borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 15, padding: 5,

    }, txt: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 8,
        margin: 10,
        color: "#FF0000"
    },

});

export default registerRootComponent(App);