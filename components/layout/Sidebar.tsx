import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarLogo from './SidebarLogo';
import SidebarItems from './SidebarItems';
import SidebarTweetButton from "./SidebarTweetButton"
import {BiLogOut} from 'react-icons/bi';

const Sidebar = () => {
    const items = [
        {
            label: "Home",
            href: "/",
            icon: BsHouseFill
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: BsBellFill
        },
        {
            label: "Profile",
            href: "/users/123",
            icon: FaUser
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
                            herf={item.href}
                            icons={item.icon}
                        />
                    ))}
                    <SidebarItems 
                     onClick={() => {}}
                     label='Logout'
                     icons={BiLogOut}
                    />
                    <SidebarTweetButton/>
                </div>
            </div>

        </div>
    );
}

export default Sidebar;