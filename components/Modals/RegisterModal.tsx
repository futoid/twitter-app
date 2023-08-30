import { useCallback, useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import userRegisterModal from "../../hooks/useRegisterModal";

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

            //Backend code for register

            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [])

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