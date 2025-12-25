export interface NotificationProps {
  id: any;
  title: string;
  message: string;
  category?: string;
  date?: string;
  onDelete: (id: number) => void;
}

export default function NotificationCard({ id, title, message, category, date, onDelete }: NotificationProps) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group mb-3 relative">
      <div className="bg-zinc-100 p-3 rounded-2xl text-zinc-600 group-hover:bg-zinc-200 transition-colors">
        <i className="text-xl ri-notification-3-line"></i>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-zinc-900 text-lg">{title}</h4>
          <div className="flex items-center gap-3">
             {date && (
               <span className="text-xs text-zinc-400">
                 {new Date(date).toLocaleDateString('tr-TR')}
               </span>
             )}
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                  onDelete(id);
               }}
               className="text-zinc-400 hover:text-red-500 transition-colors p-1"
             >
               <i className="ri-delete-bin-line text-lg"></i>
             </button>
          </div>
        </div>
        
        <p className="text-zinc-600 text-sm mt-1 line-clamp-2">
          {message}
        </p>

        {category && (
          <div className="mt-3">
            <span className="inline-block bg-zinc-100 text-zinc-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {category}
            </span>
          </div>
        )}
      </div>

      <div className="self-center">
        <i className="ri-arrow-right-s-line text-2xl text-zinc-400"></i>
      </div>
    </div>
  );
}