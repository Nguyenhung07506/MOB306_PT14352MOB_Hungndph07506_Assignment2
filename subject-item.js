import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, Modal, ScrollView, TextInput } from 'react-native';


export default function subjectItem({ item, handleDelete }) {

    const [showModal, setShowModal] = useState(false);

    const alertDelete = (name, handleDelete) => {
        return Alert.alert(
            'Delete Story !!',
            `Do you want to delete " ${name} " ?`,
            [
                {
                    text: 'Yes',
                    onPress: () => { handleDelete(name) }
                },
                {
                    text: 'No',
                    onPress: () => { }
                }
            ],
            { cancleable: false } 
        )
    };

    return (
        <View >
            <View style={style.row}>
                <View >
                    <Image style={style.image} source={{ uri: item.thumbnail }} />
                    <Text></Text>
                    <Text >{`Story name: ${item.name}`}</Text>
                    <Text></Text>
                    <Text>{`Category: ${item.category}`}</Text>
                    <Text></Text>
                    <Text>{`Total chapters: ${item.total_chapters}`}</Text>
                    <Text></Text>

                    <Text>{`Status:  ${item.is_full ? 'Full' : 'Not full'}`}</Text>
                </View>

            </View>
            <View >
                <Button  title='Detail' onPress={() => setShowModal(true)} />
            
                <Button color="#ff0000" title='Delete' onPress={() => { alertDelete(item.name, handleDelete) }} />
            </View>

            <Modal visible={showModal} >
                <ScrollView>

                <View style={style.row}>
                <View>
                    <Image style={style.image} source={{ uri: item.thumbnail }} />
                    <Text></Text>
                    <Text >{`Story name: ${item.name}`}</Text>
                    <Text></Text>
                    <Text>{`Category: ${item.category}`}</Text>
                    <Text></Text>
                    <Text>{`Total chapters: ${item.total_chapters}`}</Text>
                    <Text></Text>

                    <Text>{`Status: ${item.is_full ? 'Full' : 'Not full'}`}</Text>
                    <Text></Text>
                    <Button
                            title="Back"
                            onPress= {() => setShowModal(false)}
                            
                        />
                        <Text></Text>
                </View>

            </View>
                
                </ScrollView>

            </Modal>


        </View>
    )
}

const style = StyleSheet.create({
    row: {
        margin:7,
        padding: 8,
        flex: 1,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33FF99',


    },
   
    image: {
        width: 150,
        height: 150,
        borderRadius: 200,
       marginLeft:25,
    },




});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30
    },
    textNameLogin: {
        fontSize: 23,
        fontStyle: 'italic'
    },
    textModal: {
        padding: 8,
        margin: 10,
    },
    modal: {
        flex: 1,
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
    

});
