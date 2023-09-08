import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "../../hooks/useLoginModal";
import { useCallback } from "react";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
      loginModal.onOpen();
  }, [loginModal])

  return (
    <div onClick={onClick}>
      <div className=" mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className=" mt-6 hidden lg:flex justify-center items-center px-4 py-3 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
        <p className=" hidden lg:block pr-2 text-center font-semibold text-white text-[20px]">Tweet</p>
        <FaFeather size={25} color="white" />
      </div>
    </div>
  );
};

export default SidebarTweetButton;
