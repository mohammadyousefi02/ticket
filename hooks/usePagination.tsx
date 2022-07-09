import { useState,useEffect } from "react";

import { useDispatch,useSelector } from "react-redux";
import {setTotalPage} from "../redux/slices/paginationSlice";


export default function usePagination(arr:[],page:number){
    const dispatch = useDispatch();
    const [currentData,setCurrentData] = useState([]);
   
    useEffect(()=>{
            dispatch(setTotalPage(Math.ceil(arr.length/2)))
        const startIndex = (page-1)*2;
        const endIndex = page*2;
        setCurrentData([])
        for(let i = startIndex;i<endIndex;i++){
            if(!arr[i])break;
            else setCurrentData(prev=>[...prev,arr[i]]);
        }
    },[arr,page])
    return currentData
}