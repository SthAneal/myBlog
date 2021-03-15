import createDataContext from './createDataContext';


const blogReducre = (state, action)=>{
    switch(action.type){
        case 'edit_blogpost':
            return state.map((blogPost)=>{
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        case 'delete_blogpost':
            return state.filter((blogPost)=>blogPost.id !== action.payload);
        case 'add_blogpost':
            return [
                ...state,
                {
                    id:Math.floor(Math.random()*99999),
                    title:action.payload.title,
                    content:action.payload.content
                }
            ];
        default:
            return state;
    }
}

const addBlogPost = (dispatch)=>{
    return (title,content,cB)=>{
        dispatch({type:'add_blogpost', payload:{title,content}});
        cB();
    }
};

const deleteBlogPost = (dispatch)=>{
    return (id)=>{
        dispatch({type:'delete_blogpost', payload:id});
    }
}

const editBlogPost = (dispatch)=>{
    return (title, content, id, cB)=>{
        dispatch({type:'edit_blogpost', payload:{title, content, id}});
        cB();
    }
}

export const {Context, Provider} = createDataContext(blogReducre, {addBlogPost, deleteBlogPost, editBlogPost}, [{title:'Text Post', content:'Text Content', id:1}]);