import React from 'react';
//import react in our code.
import { StyleSheet, View, Button, TextInput,Text,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
 class EditItemScreen extends React.Component {
  static navigationOptions = {
         title: 'EditItem',
         headerStyle: {
             backgroundColor: '#FFF',
         },
       headerTintColor: 'red',
         headerTitleStyle: {
             fontWeight: 'bold',

         },
     };
     render() {
         return (
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <Text>EditItem</Text>
             <View style={{ flex: 1}}>
               <TextInput
                 placeholder='{this.state.site}'
                 style={{flex: 1/10,marginTop:5,  backgroundColor: 'lightblue'}}
                 onChangeText={(site) => {
                 console.log('site-', site)
                 this.setState({site})
                 }}
                 // value={this.state.site}
                 />
               <TextInput
                   placeholder='{this.state.log}'
                   style={{ flex: 1/10, marginTop:5,  backgroundColor: 'lightblue'}}
                   onChangeText={(log) => {
                   console.log('log-', log)
                   this.setState({log})
                   }}
                 //  value={this.state.log}
                   />

               <TextInput
                   placeholder={"+ Напишіть пароль і тисніть зберегти"}
                   autoCorrect={false}
                   secureTextEntry={true}
                   returnKeyType="done"
                   onChangeText={(pass) => this.setState({pass})}
                   style={{flex: 1/10,marginTop:5,marginBottom:15, backgroundColor: 'lightblue'}}
                   onChangeText={(pass) => {
                     console.log('pass-', pass)
                     this.setState({pass})
                   }}
                 //  value={this.state.pass}
                   />

               <TouchableOpacity
                   style={{ borderRadius: 25,alignSelf:'center',flex: 1/15, backgroundColor: 'darkblue'}}
                   onPress={() => {
                     console.log('button is pressed')
                     this._addItem()
                     this.clearText()
                     this.toggleModal()
                     this.editItem()
                   }}
                   >
                 <View style={{flex: 1,}}>
                   <Text style={{ color: 'white'}}>  Зберегти  </Text>
                 </View>
               </TouchableOpacity>
               <View style={{ borderRadius: 25, flex: 1/15,marginTop:20,   backgroundColor: '#0481B0'}}>
                 <Button title="Закрити" onPress={this.toggleModal} />
               </View>
             </View>
             <Button
                 title="Go back"
                 onPress={() => this.props.navigation.goBack()}
             />
         </View>
         );
     }
 }
 function mapStateToProps(state) {
     return {
         counter: state.appData.get('counter'),
         note: state.appData.get('note'),
         addItem: state.appData.get('addItem'),
         editItem: state.appData.get('editItem')
     }
 }
 function mapDispatchToProps(dispatch) {
     return {
         incrementCounter() {
             dispatch(incrementCounter())
         },
         decrementCounter() {
             dispatch(decrementCounter())
         },
         resetCounter() {
             dispatch(resetCounter())
         },
         addItem(site,log,pass){
             dispatch(addItem(site,log,pass))
         },
         resetaddItem() {
             dispatch(resetaddItem())
         },
         editItem() {
             dispatch(editItem())
         },
     }
 }

 export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(EditItemScreen)
