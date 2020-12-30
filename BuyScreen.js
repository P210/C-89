import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BuyScreen extends React.Component{
    constructor(){
        super();
            this.state={
         userId:firebase.auth().currentUser.email,
         bookName:"",
         reasonToRequest:""
            }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    addRequest=(bookName,reasonToRequest)=>{
        var userId= this.state.userId
        var ramdomRequestId= this.createUniqueId()
        db.collection('requested_books').add({
            "user_id": userId,
            "book_name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id"  : randomRequestId,
        })
        this.setState({
            bookName :'',
            reasonToRequest : ''
        })
        return Alert.alert("Buy Request Successfull")
    }
    keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        leftElement={
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: item.image_link,
            }}
          />
        }
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("RecieverDetails", {
                details: item,
              });
            }}
          >
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };
  getIsBookRequestActive() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsBookRequestActive: doc.data().IsBookRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }
  render() {
    if (this.state.IsBookRequestActive === true) {
      return (
        <View style={{ flex: 1}}>
          <View
            style={{
              flex: 0.1,
            }}
          >
            <MyHeader title="Book Status" navigation={this.props.navigation} />
          </View>
          <View
            style={styles.ImageView}
          >
            <Image
              source={{ uri: this.state.requestedImageLink }}
              style={styles.imageStyle}
            />
          </View>
          <View
            style={styles.bookstatus}
          >
            <Text
              style={{
                fontSize: RFValue(20),

              }}
            >
              Name of the book
            </Text>
            <Text
              style={styles.requestedbookName}
            >
              {this.state.requestedBookName}
            </Text>
            <Text
              style={styles.status}
            >
              Status
            </Text>
            <Text
              style={styles.bookStatus}
            >
              {this.state.bookStatus}
            </Text>
          </View>
          <View
            style={styles.buttonView}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.sendNotification();
                this.updateBookRequestStatus();
                this.receivedBooks(this.state.requestedBookName);
              }}
            >
              <Text
                style={styles.buttontxt}
              >
                Book Recived
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Request Book" navigation={this.props.navigation} />
        </View>
        <View style={{ flex: 0.9 }}>
          <Input
            style={styles.formTextInput}
            label={"Book Name"}
            placeholder={"Book name"}
            containerStyle={{ marginTop: RFValue(60) }}
            onChangeText={(text) => this.getBooksFromApi(text)}
            onClear={(text) => this.getBooksFromApi("")}
            value={this.state.bookName}
          />
          {this.state.showFlatlist ? (
            <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem}
              enableEmptySections={true}
              style={{ marginTop: RFValue(10) }}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Input
                style={styles.formTextInput}
                containerStyle={{ marginTop: RFValue(30) }}
                multiline
                numberOfLines={8}
                label={"Reason"}
                placeholder={"Why do you need the book"}
                onChangeText={(text) => {
                  this.setState({
                    reasonToRequest: text,
                  });
                }}
                value={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: RFValue(30) }]}
                onPress={() => {
                  this.addRequest(
                    this.state.bookName,
                    this.state.reasonToRequest
                  );
                }}
              >
                <Text
                  style={styles.requestbuttontxt}
                >
                  Request
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    keybordStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )