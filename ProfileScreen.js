import React from 'react';
import { StyleSheet, View, Text, Button,TextInput,TouchableOpacity } from 'react-native';
export default class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Profile Screen</Text>
                <View style={{ flex: 1}}>
                  <TextInput
                    placeholder="Напишіть назву сайта"
                    style={{flex: 1/10,marginTop:5,  backgroundColor: 'lightblue'}}
                    onChangeText={(site) => {
                    console.log('site-', site)
                    this.setState({site})
                    }}
                    //value={this.state.site}
                    />
                  <TextInput
                      placeholder={this.state.log}
                      style={{ flex: 1/10,marginTop:5,  backgroundColor: 'lightblue'}}
                      onChangeText={(log) => {
                      console.log('log-', log)
                      this.setState({log})
                      }}
                    //  value={this.state.log}
                      />

                  <TextInput
                      placeholder="+ Напишіть пароль і тисніть зберегти"
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
                    title="Go to Profile... again"
                    onPress={() => this.props.navigation.push('Profile')}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                 />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
    );
    }
}
