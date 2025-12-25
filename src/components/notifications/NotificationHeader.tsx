export default function NotificationHeader() {
  return (
    <div className="w-full max-w-[80%] md:max-w-[65%] flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-4xl font-semibold text-zinc-900">Notifications</h1>
      <div className="flex flex-row items-center gap-4">
        <button className="p-2 hover:bg-zinc-200 rounded-full "><i className="text-2xl ri-information-line"></i></button>
           <button className="p-2 hover:bg-zinc-200 rounded-full "><i className="text-2xl ri-notification-3-fill"></i></button>
            <button className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-3 rounded-xl text-sm font-medium shadow-sm hover:bg-zinc-50 transition-all">
            <i className="ri-settings-line"></i> 
           <span className="hidden lg:inline">Customize Homepage</span>
        </button>
        
      </div>
      
    </div>

    
    
  );
}