import { IconType } from "react-icons";

interface SidebarItemsProps {
    label: string,
    herf?: string,
    icons: IconType;
    onClick?: Function;
}
const SidebarItems: React.FC<SidebarItemsProps> = ({ label, herf, icons: Icon, onClick }) => {
    return (
        <div className=" flex flex-col">
            <div className=" 
                relative 
                rounded-xl 
                h-14 
                w-14 
                flex 
                items-center 
                p-4
                hover:bg-slate-300 
                hover:bg-opacity-10 
                cursor-pointer 
                lg:hidden 
                ">
                <Icon size={28} color="white" />
            </div>
            <div className=" relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
            <Icon size={24} color="white"/>
            <p className=" hidden lg:block text-white font-semibold">
                {label}
            </p>
            </div>
        </div>
    );
}

export default SidebarItems;