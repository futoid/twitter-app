import { useCallback, useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import userRegisterModal from "../../hooks/useRegisterModal";
import Input from "../Input";
import Modal from "../Modal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = userRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);

            signIn('credentials' , {
                email,
                password
            })

            setIsLoading(false);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }, [email, password])

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    
    }, [isLoading,registerModal,loginModal])

    const bodyContent = (
        <div className=" flex flex-col gap-4">
            <Input 
                placeholder="Email"
                value={email}
                disabled = {isLoading}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            <Input 
                placeholder="Password"
                value={password}
                disabled = {isLoading}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
        </div>
    )

    const footerElement = (
        <div className=" text-neutral-400 text-center mt-4">
            <p>
                First time here? <span className=" text-white cursor-pointer hover:underline" onClick={onToggle}>Create an accout</span>
            </p>

        </div>
    )

    return (
        <>
            <Modal
            disabled = {isLoading}
            isOpen = {loginModal.isOpen}
            title="Login"
            actionLabel="Sign In"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerElement}
        />
        </> 
     );
}
 
export default LoginModal;