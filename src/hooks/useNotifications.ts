'use client';
import {useState,useEffect} from 'react';
import {api} from '@/server/api'; // for backend communication

/*  I implemented a useNotification hook to handle
    CRUD operations (create,read,delete) for notifications
    through backend api integration. */

function useNotification () {
    const [notifications,setNotification]=useState([]); // I used useState for notifications array and we can cange this arra using setNotification. 
    const [loading,setLoading]=useState(true);

    const getAllNotifications = async() => { // for getting all notifications from the backend using api
        try {
          setLoading(true);  // not completed yet so I set true
         const result = await api.getNotifications(); // I fetched the data by sending requests to the designated backend URL via the api."
        setNotification(result);  // added all data to notifcations array.  
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false); // completed all process I set it false.
        }
    };

    
    const removeNotification = async (id:number) => {
    try {
      await api.deleteNotification(id); // I delete the specific notification by using id parameter.
      await getAllNotifications(); 
    } catch (error) {
      alert("Error occurred while deleting the notification.");
    }
  };


    useEffect(()=>{
        getAllNotifications();
    },[]) // getting all the notifications in the first mount

    return {notifications,loading,refetch:getAllNotifications,removeNotification};
    // refetch is for after the any adding ar deleting operation.  
}

export {useNotification};