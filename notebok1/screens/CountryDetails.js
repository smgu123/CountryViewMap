import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacityBase,
  ActivityIndicator
  } from 'react-native';
  import axios from 'react-native-axios';
  import {Picker} from '@react-native-community/picker';
  import ContentLoader  from 'react-native-easy-content-loader';

  class CountryDetails extends React.Component {
    constructor(props){
        super(props);  
        
        this.state={
            data : [],
            languages:[],
            selectedlanguages: 'english',
            translate : [{"hindi":"मेरे राष्ट्र में आपका स्वागत है धन्यवाद","french":"Bienvenue dans ma nation Merci",
          "chinese":"欢迎来到我的国家谢谢","portuguese":"Bem vindo a minha nação obrigado","english":"Welcome to my nation Thank you"
          }],
            language1:'',
            loading:true
        }
    }

   translation = (() => {

    // fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
    //   "method": "POST",
    //   "headers": {
    //     "x-rapidapi-host": "google-translate1.p.rapidapi.com",
    //     "x-rapidapi-key": "5ad6aa1c3amshb95536e003f4fd1p15407fjsne3751650d0dd",
    //     "accept-encoding": "application/gzip",
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   "body": {
    //     "source": "en",
    //     "q": "Hello, world!",
    //     "target": "es"
    //   }
    // })
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    switch(this.state.selectedlanguages){
      case "Hindi" : this.setState({language1:this.state.translate[0].hindi})
                     break;
      case 'French' : this.setState({language1:this.state.translate[0].french})
                     break;      
      case 'Chinese' : this.setState({language1:this.state.translate[0].chinese})
                     break;
       case 'Portuguese' : this.setState({language1:this.state.translate[0].portuguese})
                     break; 
      case 'english' : this.setState({language1:this.state.translate[0].english})
                     break;  
      default : this.setState({language1:this.state.translate[0].english})  
                      break;
    }
   })
    
    async componentDidMount() {
        try{
            const uri = `https://restcountries.eu/rest/v2/name/${this.props.route.params.country}?fullText=true`
            const response = await fetch(uri)
            
            const data1 = await response.json()
        
            this.setState({languages : data1[0].languages});
            this.setState({ data: data1 });

            setTimeout(() => { 
              this.setState({ loading: false });
            }, 1000);
          }
          catch(error){
            alert("api cannot fetched",error);
            
          }  
      }

handlelanguage = ((value) => {
  this.setState({languages:value})
  console.log(this.state.languages[0])
})

    
    render(){

      let languageItems = this.state.languages.map( (s, i) => { 
        return <Picker.Item key={i} value={s.name} label={s.name} /> });

        const { data } = this.state;
        

  return(
    
    <View style={{ flex: 1, padding: 24,backgroundColor:'white' }}>
   
       {this.state.loading ? <ContentLoader active pWidth={["100%", 200, "25%", 45]} /> : (
         <View>
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
          
          <View style={{alignSelf:'center'}}>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>Country Name : {item.name}</Text>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>Capital : {item.capital}</Text>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>Region : {item.region}</Text>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>TimeZONES : {item.timezones}</Text>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>Population : {item.population}</Text>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>Native Names : {item.nativeName}</Text>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>Calling code : {item.callingCodes}</Text>
      <Text style={{fontWeight:"bold",fontSize:25,color:"black"}}>Currencies : {item.currencies[0].name}</Text>
      
      
      {/* {item.languages.length == 1 ? 
      <Text style={{fontWeight:"bold",fontSize:25,color:"white"}}>{item.languages[0].name}</Text> : 
      <View>
      <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>{item.languages[0].name}</Text>
      <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>{item.languages[1].name}</Text>
      </View>} */}
      
     <TouchableOpacity style={styles.button} 
     onPress={()=>{this.props.navigation.navigate('Map',
     {location : item.latlng, name: item.name, area: item.area})}}
     >
      <Text style={styles.btn}>MapView</Text>
    </TouchableOpacity></View>
  )}
    />     

  </View>   
       )}  

       <Picker selectedValue={this.state.selectedlanguages} 
      onValueChange={ (service) => ( this.setState({selectedlanguages:service}) ) }>
      {languageItems} 
      </Picker>

        <TouchableOpacity style={styles.button} onPress={this.translation}>
        <Text style={styles.btn}>Translate</Text>
        </TouchableOpacity>
        <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>{this.state.language1}</Text>
        </View>
      
  );
}
}

export default CountryDetails;

const styles = StyleSheet.create({
  
    button:{
      padding:20,
      backgroundColor:'gray',
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
    
  })