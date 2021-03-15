import React, {useContext} from "react";
import {Text, View, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import {AntDesign} from '@expo/vector-icons';

const IndexScreen = ({navigation})=>{
    const {state, deleteBlogPost} = useContext(Context);
    return(
        <View>
            <FlatList 
                data={state} 
                keyExtractor={(blogPost)=>blogPost.title}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity onPress={()=>navigation.navigate('Show', {id:item.id})}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}---{item.id}</Text>
                                <TouchableOpacity onPress={()=>deleteBlogPost(item.id)}>
                                    <AntDesign name="delete" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

IndexScreen.navigationOptions = ({navigation})=>{
    return {
        headerRight:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('Create')}>
                <AntDesign name="plus" size={24} color="black" style={{marginRight:10}}/>
            </TouchableOpacity>
        )
        
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:10,
        borderBottomWidth:1,
        borderColor:'gray'
    },
    icon:{
        fontSize:24
    },
    title:{
        fontSize:18
    }
});

export default IndexScreen;