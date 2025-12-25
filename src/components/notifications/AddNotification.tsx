'use client';
import {useState} from 'react';
import {api} from '@/server/api';

export default function AddNotification({isOpen, onClose, onRefresh}: any) {
  /* I implemented this structure to manage the notification adding window visibility and to ensure the list 
  stays up-to-date by triggering a refresh immediately after a new notification is successfully added */
  const [formData, setFormData] = useState({ title:'',message:'',category:'General'});

  if (!isOpen){
    return null;
  }
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createNotification(formData);
      onRefresh(); 
      onClose();  
      setFormData({ title: '', message: '', category: 'General' }); 
    } catch (error) {
      alert("Error occured.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-4xl w-full max-w-md p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-zinc-900">New Notification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full p-4 bg-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-300"
            placeholder="Title"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <textarea 
            className="w-full p-4 bg-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-300 min-h-30"
            placeholder="Message"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          />
          <select 
            className="w-full p-4 bg-zinc-100 rounded-2xl outline-none cursor-pointer"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="general">General</option>
            <option value="update">Update</option>
            <option value="collaboration">Collaboration</option>
            <option value="reminder">Reminder</option>
            <option value="status">Status</option>

          </select>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 font-semibold text-zinc-500">Cancel</button>
            <button type="submit" className="flex-1 py-4 bg-zinc-900 text-white rounded-2xl font-semibold hover:bg-zinc-800 transition-all">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}