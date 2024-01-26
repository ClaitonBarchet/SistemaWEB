import { useState, useEffect, useReducer } from "react"
import { db } from "../firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore"


// 
import { useInsertDocument } from "../../hooks/useInsertDocument";

const [ permissão, setPermissão] = useState("não")
const [ nome, setNome] = useState("meu nome")
const [ apelido, setApelido] = useState("nick name")
const { response, insertDocument} = useInsertDocument("users")
const { user } = useAuthValue();
// 



const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action)=>{
    switch(action.type){

        case "LOADING":
            return{ loading: true, error: null };
        case "INSERTED_DOC":
            return{ loading: false, error: null };
        case "ERROR":
            return{ loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useInsertUsuário = (docCollection) =>{

    const[response, dispatch] = useReducer(insertReducer, initialState);

    // deal memory leak
    const[cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action)=>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertUsuário = async(document) =>{
        checkCancelBeforeDispatch({
            type: "LOADING",
        })

        try {
            const newDocument = {...document,createdAt: Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })

            
        }catch(error) {

            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })

        }
    }

    useEffect(()=> {
        return () => setCancelled(true);
    },[]);

    return { insertUsuário, response };

}