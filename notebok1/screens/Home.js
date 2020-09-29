import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
  } from 'react-native';
  import axios from 'react-native-axios';
import {Picker} from '@react-native-community/picker';

// var width = Native.Dimensions.get('window').width; 

  class Home extends React.Component {
      constructor(props){
          super(props)
          
          this.state={
              data:[],
              selectedLabel:''
          }
        
      }

async componentDidMount (){
  const res = await axios.get("https://restcountries.eu/rest/v2/all")
  this.setState({data :res.data})
}
      
  render(){
        let nameItems = this.state.data.map( (s, i) => { 
          return <Picker.Item key={i} value={s.name} label={s.name} /> });
  
    return(
        <View style={{flex:1,backgroundColor:'white'}} >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        
        <View style={styles.picker}>

             <Picker selectedValue={this.state.selectedLabel} 
             style={{height: 100, width: "100%"}}
             onValueChange={(itemValue) =>
              this.setState({selectedLabel: itemValue})}>
      {nameItems} 
      </Picker>
            </View>         

            <TouchableOpacity style={styles.button} 
              onPress={()=>{this.props.navigation.navigate('CountryDetails', {
                country: this.state.selectedLabel,
              })}}
              >
               <Text style={styles.btn}>CountryDetails</Text>
             </TouchableOpacity>
        </View>
        </View>
       
    );
  }
}

  export default Home;

  const styles = StyleSheet.create({
  
  button:{
    padding:20,
    backgroundColor:'#36485f',
    marginTop:30,
    marginBottom:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    width:'40%'
  },
  btn:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:20
  
  },
  picker:{
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width:"70%",
    marginBottom:30
  }
  
})