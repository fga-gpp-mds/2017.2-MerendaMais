import React,{Component} from 'react';
import { StyleSheet, Text, View,Button,Image,TouchableOpacity} from 'react-native';


export default class App extends React.Component {

  render() {
    return (
      <View style={styles.im}>
        <Image source = {require('./img/App.png')}>
          <View style={styles.capa}>
          <Text style={styles.txt}>MERENDA +</Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.txt_btn}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn1}>
            <Text style={styles.txt_btn}>Cadastrar</Text>
          </TouchableOpacity>

          </View>
        </Image>

        </View>
    );
  }
}


const styles=StyleSheet.create({
      im:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000000'
      },
      capa:{
        alignItems:'center',
        flex:1,
        backgroundColor:'transparent',
        shadowOffset:{width:0,height:1},
        shadowOpacity:1
      },
      btn:{
        paddingHorizontal:150,
        paddingVertical:20,
        marginBottom:50,
        marginTop:200,
        backgroundColor:'#FF9500',
        borderRadius:10

      },
      txt_btn:{
        fontSize:20,
        color:'white'
      },
      btn1:{
        paddingHorizontal:135,
        paddingVertical:20,
        marginBottom:50,
        marginTop:10,
        backgroundColor:'#FF9500',
        borderRadius:10

      },
      txt:{
        fontSize:60,
        fontWeight:'bold',
        color:'white',
        marginTop:200
      }
});
