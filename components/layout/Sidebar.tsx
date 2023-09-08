import useCurrentUser from '../../hooks/useCurrentUser';

import { signOut } from 'next-auth/react';

import SidebarLogo from './SidebarLogo';
import SidebarItems from './SidebarItems';
import SidebarTweetButton from "./SidebarTweetButton"

import { FaUser } from 'react-icons/fa'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import {BiLogOut} from 'react-icons/bi';


const Sidebar = () => {
    const {data : currentUser} = useCurrentUser();
    const items = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: BsBellFill,
            auth : true
        },
        {
            label: "Profile",
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth : true
        }

    ]
    return (
        <div className=" col-span-1 h-full md:pr-6 ">
            <div className=" flex flex-col items-center ">
                <div className=' space-y-2 lg:w-[230px]'>
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItems
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            icons={item.icon}
                            auth = {item.auth}
                        />
                    ))}
                    {
                        currentUser && <SidebarItems 
                        onClick={() => signOut()}
                        label='Logout'
                        icons={BiLogOut}
                       />
                    }
                    <SidebarTweetButton/>
                </div>
            </div>

        </div>
    );
}

export default Sidebar;