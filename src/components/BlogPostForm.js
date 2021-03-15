import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const BlogPostForm = ({onSubmit, initialValues})=>{
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);
    return(
        <View style={{padding:10}}>
            <Text style={styles.text}>Title:</Text>
            <TextInput style={styles.textBox} value={title} onChangeText={(text)=>setTitle(text)}/>
            <Text style={styles.text}>Content:</Text>
            <TextInput style={styles.textBox} value={content} onChangeText={(text)=>setContent(text)}/>
            <Button title="Save Blog Post" onPress={()=>onSubmit(title, content)} />
        </View>
    );
};

BlogPostForm.defaultProps = {
    initialValues:{
        title:'',
        content:''
    }
}

const styles = StyleSheet.create({
    text:{
        marginBottom:3
    },
    textBox:{
        borderWidth:1,
        padding:4,
        marginBottom:10
    }
});

export default BlogPostForm;