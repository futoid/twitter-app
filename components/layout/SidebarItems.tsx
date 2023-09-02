import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import useCurrentUser from "../../hooks/useCurrentUser";
import useLoginModal from "../../hooks/useLoginModal";

interface SidebarItemsProps {
    label: string,
    href?: string,
    icons: IconType;
    onClick?: () => void;
    auth ?: boolean
}
const SidebarItems: React.FC<SidebarItemsProps> = ({ label, href, icons: Icon, onClick, auth }) => {
    const {data : currentUser} = useCurrentUser();
    const loginModal = useLoginModal();
    const router = useRouter();
    
    const handleClick = useCallback(() => {
        if(onClick){
            return onClick();
        }
        if(auth && !currentUser){
            loginModal.onOpen();
        }
        else if(href){
            router.push(href);
        }
    }, [router, onClick, href, currentUser, auth, loginModal])
    
    return (
        <div onClick={handleClick} className=" flex flex-col">
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