import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducre = (state, action)=>{
    switch(action.type){
        case 'get_blogpost':
            return action.payload;
        case 'edit_blogpost':
            return state.map((blogPost)=>{
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        case 'delete_blogpost':
            return state.filter((blogPost)=>blogPost.id !== action.payload);
        /* case 'add_blogpost':
            return [
                ...state,
                {
                    id:Math.floor(Math.random()*99999),
                    title:action.payload.title,
                    content:action.payload.content
                }
            ]; */
        default:
            return state;
    }
}

const getBlogPost = (dispatch)=>{
    return async ()=>{
        const response = await jsonServer.get('/blogposts');
        dispatch({type:'get_blogpost', payload:response.data});
    }
}

const addBlogPost = (dispatch)=>{
    return async (title,content,cB)=>{
        await jsonServer.post('/blogposts', {title,content});
        //dispatch({type:'add_blogpost', payload:{title,content}});
        cB();
    }
};

const deleteBlogPost = (dispatch)=>{
    return async (id)=>{
        await jsonServer.delete(`/blogposts/${id}`);

        dispatch({type:'delete_blogpost', payload:id});
    }
}

const editBlogPost = (dispatch)=>{
    return async (title, content, id, cB)=>{
        await jsonServer.put(`/blogposts/${id}`, {title, content});
        
        dispatch({type:'edit_blogpost', payload:{title, content, id}});
        cB();
    }
}

export const {Context, Provider} = createDataContext(blogReducre, {addBlogPost, deleteBlogPost, editBlogPost, getBlogPost}, []);