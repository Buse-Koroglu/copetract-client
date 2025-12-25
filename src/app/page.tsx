'use client';
import { useState, useMemo } from 'react'; // I use useState andd useMemo for notification filter by using category and date 
import  Sidebar from '@/components/layouts/Sidebar'; // this component is for the sideba in the figma design
import NotificationHeader from '@/components/notifications/NotificationHeader'; // Notificaton Header Component 
import EmptyState from '@/components/notifications/EmptyCard'; // If there is no notificiation then I show EmptyCard Component. 
import NotificationCard from '@/components/notifications/NotificationCard'; // This is the component that all the notfications are shown.
import { useNotification } from '@/hooks/useNotifications'; 
import AddNotification from '@/components/notifications/AddNotification'; // for adding new notification

function NotificationsPage() {
  const {notifications,loading, refetch,removeNotification} = useNotification(); // useNotification 
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  const [categoryFilter, setCategoryFilter] = useState('all'); // I set the categoryFilter all by default.
  const [dateFilter, setDateFilter] = useState('new'); // I set the dateFilter new by default.

  const filteredNotifications = useMemo(() => {
    if (!notifications) return [];

    return notifications
      .filter((n:any) => {
        if (categoryFilter==='all') return true;
        return n.category===categoryFilter;
      }).sort((first:any, second:any) => {
        const dateFirst = new Date(first.date).getTime();
        const dateSecond = new Date(second.date).getTime();
        return dateFilter==='newest' ? dateSecond - dateFirst : dateFirst - dateSecond;
      });
  }, [notifications, categoryFilter, dateFilter]);

  /* I used useMemo to memoize the notifications ensuring they are only re-calculated 
  when dateFilter or categoryFilter changes. Based on the selected filters I return the appropriately 
  filtered and sorted notification data. */

  const hasNotifications = filteredNotifications.length > 0;  // for using EmptyCard component

  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans">
      <Sidebar />
      <div className="flex-1 p-4 md:ml-64 md:p-10 flex flex-col items-center">
        <NotificationHeader />

        <div className="w-full max-w-[95%] md:max-w-[65%] bg-white rounded-[40px] shadow-2xl border border-zinc-100 p-6 md:p-12">
          
          <div className="flex justify-between items-center mb-6">
             <div className='flex items-center gap-2'>
                <i className="text-2xl ri-notification-3-fill text-zinc-400"></i>
                <p className="text-zinc-500 text-lg font-medium">Activity Feed</p>
             </div>
             <button 
               onClick={() => setIsAddOpen(true)}
               className="bg-zinc-900 text-white px-8 py-3 rounded-2xl hover:bg-zinc-800 transition-all active:scale-95"
             >
               Add
             </button>
          </div>

          <div className="flex flex-row justify-start gap-3 mb-8">
            <div className="relative">
              <select 
                value={dateFilter}
                onChange={(e)=>setDateFilter(e.target.value)} // I used select and options for selecting dateFilter
                className=" bg-white border border-zinc-200 px-4 py-2 pr-8 rounded-full text-sm font-medium text-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer appearance-none shadow-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"></i>
            </div>

            <div className="relative">
              <select 
                value={categoryFilter} // I used select and options for selecting categoryFilter
                onChange={(e) => setCategoryFilter(e.target.value)}
                className=" bg-white border border-zinc-200 px-4 py-2 pr-8 rounded-full text-sm font-medium text-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none cursor-pointer shadow-sm"
              >
                <option value="all">All</option>
                <option value="general">General</option>
                <option value="status">Status</option>
                <option value="update">Update</option>
                <option value="collaboration">Collaboration</option>
                <option value="reminder">Reminder</option>

              </select>
              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"></i>
            </div>
          </div>

          { loading?(
            <div className="flex flex-col items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900"></div>
              <p className="text-zinc-400 mt-4 animate-pulse">Loading...</p>
            </div>
          ) : !hasNotifications? (
            <EmptyState /> // if there are no notificiation then i have to show empty card component.
          ) : (
            <div className="flex flex-col gap-1">
              {filteredNotifications.map((n:any) => (
                <NotificationCard 
                  key={n.id}
                  id={n.id}
                  title={n.title}
                  message={n.message}
                  category={n.category}
                  date={n.date}
                  onDelete={removeNotification}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <AddNotification
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onRefresh={refetch} 
      />
    </div>
  );
}

export default NotificationsPage;
