const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// I used an interface to define the structure of the Notification data. For type safety i limited the data for adding notification. 
interface Notification {
    title: string;
    message: string;
    category: string;
}

const getNotifications= async() =>  {
    const result = await fetch(`${url}`); // request to the backend url fetch the data
    if(!result.ok){
        throw new Error("Can not get the notifications");
    }
     return result.json();
};

const createNotification = async(data: Notification) =>  {
    const result = await fetch(`${url}`, {
    method: 'POST', // post operation for adding
    headers: { 'Content-Type': 'application/json' }, // json format
    body: JSON.stringify(data),
  });
  return result.json();
};

const deleteNotification = async (id:number) => {
  const result = await fetch(`${url}/${id}`, { // I sent a request to the backend for deleting with specific id.
        method: 'DELETE',
  } );
  if (!result.ok) {
    throw new Error("Can not delete the notification");
  }
  return result; 
};

export const api={
  getNotifications,
  createNotification,
  deleteNotification
};