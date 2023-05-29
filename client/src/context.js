import { createContext, useContext, useReducer } from "react";
import reducer from './reducer';


const AppContext = createContext();

const initialState = {
    name: "",
    email: ""
}


const AppProvider = ({ children }) => {


//This is for localhost
    // const url = 'http://44.201.156.0:8080';

   const url = '/api';


// const url = 'http://localhost:3001';

    

    const [state, dispatch] = useReducer(reducer, initialState);

    const userUpdate = (name,email) => {
        return dispatch(
            {
                type: "User_Update",
                payload: {
                    name,
                    email

                },
            }
        )
    }





    return <AppContext.Provider value={{ ...state, url, userUpdate }}>{children}</AppContext.Provider>;
};


// Global Custom Hook

const useGlobalContext = () => { return useContext(AppContext); };

export { AppProvider, useGlobalContext };

