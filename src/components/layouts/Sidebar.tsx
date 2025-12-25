import Image from 'next/image';

const SIDEBAR_ITEMS = [
  { group: 'GROUP', items:[
    {label:'Home', icon:'ri-home-5-line'},
    {label:'Document',icon:'ri-file-3-line'},
    {label:'Calendar', icon:'ri-calendar-line'},
    {label:'People', icon:'ri-group-line', active:true},
    {label:'Analytics',icon:'ri-search-line' },
    {label:'Payments', icon:'ri-bank-card-line' },
    {label:'Copetract AI', icon:'ri-ai' },
  ] },
  { 
    group: 'ORGANIZATION', items:[
    {label:'Settings', icon:'ri-settings-2-line'},
    {label:'Help & Feedback',icon:'ri-question-line'},

  ]}
];

function Sidebar() {
  return (
    // coptract and notification icon 
    <aside className="p-3 hidden  md:flex w-64 bg-white border-r border-zinc-200 flex-col fixed inset-y-0 left-0 items-start overflow-y-auto">
      <div className="flex flex-row m-3 pr-4  items-center justify-between w-full ">
          <h1 className="text-2xl text-black-800 font-semibold">copetract</h1> 
          <i className=" text-2xl ri-notification-3-fill p-1 cursor-pointer"></i>
      </div>
      
      {/* User Info */}
      <button className="flex flex-col py-3 px-7 bg-zinc-100  border-b-gray-300 shadow-lg  rounded-2xl w-full mx-auto my-4  transition-transform">
        <div className='flex flex-row justify-center items-center gap-2'>
          <Image src="/profile.jpg" alt="Profile Photo" width={40} height={40} className="rounded-full shadow-md" />
          <h2 className=" text-black-800 font-semibold">Jane's Home <i className="ri-arrow-right-s-line"></i></h2>
        </div>
      </button>

       {/* Menu Part with all sections (Home,Document,Calender,Settings...) */}
      { SIDEBAR_ITEMS.map((section) => (
        <div key = {section.group} className=" mt-5 flex flex-col  w-full">
          <h1 className="text-zinc-500 font-medium md:text-sm px-4 mb-2">{section.group}</h1>
          {section.items.map((item) => (
            <button key={item.label} className={`cursor-pointer flex flex-col py-2 px-7 rounded-2xl w-full my-1 transition-all '}`}>
              <div className='flex flex-row justify-start items-center'>
                <h2 className="text-black-600 p-1"><i className={` ${item.icon} mr-2 `}></i>{item.label}</h2>
              </div>
            </button>
          ))}
        </div>
      ))}

    </aside>
  )
};

export default Sidebar;