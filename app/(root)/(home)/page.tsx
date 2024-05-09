
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full' })).format(now);
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className='h-14 flex px-8 justify-between items-center gap-20'>
        <div className='h-full w-2/12 text-black font-extrabold flex justify-center items-center border rounded-xl border-black bg-white'>{time}</div>
        <div className='h-full w-1/5 text-black font-extrabold flex justify-center items-center border rounded-xl border-black bg-white'>{date}</div>
      </div>

      <MeetingTypeList />
      
    </section>
  )
}

export default Home