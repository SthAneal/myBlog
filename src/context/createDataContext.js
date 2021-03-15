import React,{useReducer} from "react";

export default (reducer, actions, initialState)=>{
    const Context = React.createContext();

    const Provider = ({children})=>{
        const [state, dispatch] = useReducer(reducer, initialState);
        const bindAction = {};

        for(let key in actions){
            bindAction[key] = actions[key](dispatch);
        }

        return(
            <Context.Provider value={{state, ...bindAction}}>{children}</Context.Provider>
        );
    };

    return {Context, Provider};
}