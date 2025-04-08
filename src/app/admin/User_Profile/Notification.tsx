'use client';
import Image from 'next/image';
import Orders from './Orders';
import { MoreOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
const notifications = [
  { id: 1, icon: '/pic-2.png', title: 'New Order', message: 'Selena has placed a new order' },
  { id: 2, icon: '/pic-5.png', title: 'New Enquiry', message: 'Phileine has placed a new order' },
  { id: 3, icon: '/pic-6.png', title: 'Support Ticket', message: 'Emma has placed a new order' },
  { id: 4, icon: '/pic-2.png', title: 'New Order', message: 'Ryan has placed a new order' },
  { id: 5, icon: '/pic-8.png', title: 'Company Meetup', message: 'Emma has placed a new order' },
];
const stats = [
  { id: 1, img: '/pic-1.png', count: '5300', label: 'New Users' },
  { id: 2, img: '/pic-2.png', count: '1953', label: 'Order Placed' },
  { id: 3, img: '/pic-3.png', count: '1450', label: 'Total Sales' },
];

const Notification = () => {
  return (
    <div className="max-w-4xl mx-auto py-4  bg-white rounded-lg shadow-lg">
      <div className="flex border-b border-black pb-2 mb-4 mx-4 gap-20">
        <h2 className="text-lg font-semibold mr-4">Profile</h2>
        <h2 className="text-lg text-gray-400">Setting</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6 mx-6">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center p-2 rounded-lg border border-black gap-4">

            <Image
             src={stat.img}
             alt={stat.label}
             width={18}
             height={18}
             className="rounded-lg bg-custom-gradient w-8 p-2" />
            <div>
              <p className="text-sm lg:text-lg font-semibold">{stat.count}</p>
              <p className="text-gray-500 text-[10px] lg:text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 rounded-lg border border-black">
        <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
          
          <h3 className="text-lg font-semibold">Latest Notification</h3>
          <div className='flex '> 
          <TfiReload className='text-gray-500'/>
          <MoreOutlined size={26} className="text-gray-500  cursor-pointer" />
          </div>
        </div>
        {notifications.map((notif) => (
          <div key={notif.id} className="flex items-center gap-4 mb-3">
           <Image 
  src={notif.icon} 
  alt={notif.title} 
  width={18} 
  height={18} 
  className="rounded-lg bg-custom-gradient w-8 p-2" 
/>
            <div>
              <p className="font-semibold text-[10px] lg:text-sm">{notif.title}</p>
              <p className="text-gray-500 text-[10px] lg:text-sm">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>

    <div>
      <Orders/>
    </div>
    </div>
  );
};

export default Notification;
