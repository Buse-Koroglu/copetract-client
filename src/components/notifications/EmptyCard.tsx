import Image from 'next/image';

export default function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center p-12  text-center">
       <Image src="/notfication.png" alt="can not found notification." width={300}  height={300} />
       <h2 className='font-semibold text-3xl mt-4 '> No result found.</h2>
      <p className="text-zinc-500 mt-2  max-w-sm "> There are no notifications that match the current filters. Please try again.</p>
    </div>
  );
}