import axios from "axios";
import { useCallback, useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import userRegisterModal from "../../hooks/useRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = userRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            
            await axios.post("/api/Register" , {
                email,
                username,
                name,
                password
            })

            setIsLoading(false);

            signIn('credentials' , {
                email,
                password
            });

            toast.success("Account Created");
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
        }
    }, [email, username, name, password, registerModal])

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();

    }, [isLoading, registerModal, loginModal])

    const bodyContent = (
        <div className=" flex flex-col gap-4">
            <Input
                placeholder="Email"
                value={email}
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                placeholder="Name"
                value={name}
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Username"
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                placeholder="Password"
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )

    const footerElement = (
        <div className=" text-neutral-400 text-center mt-4">
            <p>
                Already have an account? <span className=" text-white cursor-pointer hover:underline" onClick={onToggle}>Log In</span>
            </p>

        </div>
    )

    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Create an Accout"
                actionLabel="Register"
                onClose={registerModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerElement}
            />)
        </>
    );
}

export default RegisterModal;