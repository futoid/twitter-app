import React, { useCallback, useState } from "react";
import userRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import useCurrentUser from "../hooks/useCurrentUser";
import usePosts from "../hooks/usePosts";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "./Input";
import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
    placeholder: string;
    isComment?: string;
    postId?: string
}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {

    const registerModal = userRegisterModal();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(() => {
        try {
            setIsLoading(true);

            const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

            axios.post("/api/posts", { body });

            toast.success("Tweeted");

            setBody(' ');
            mutatePosts();
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts])

    return (
        <div className=" border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className=" flex felx-row gap-4"> 
                    <div>
                        <Avatar userId={currentUser?.id}/>
                    </div>
                    <div className=" w-full">
                        <textarea
                        disabled = {isLoading}
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        className=" disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
                        placeholder={placeholder}
                        >
                        </textarea>
                        <hr
                         className=" opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-500 transition"
                        />
                        <div className="mt-4 flex flex-row justify-end">
                            <Button disabled = {isLoading || !body} label="Tweet" onClick={onSubmit}/>
                        </div>
                    </div>
                </div>
            )
                :
                (
                    <div className=" py-8">
                        <h1 className=" text-white text-2xl text-center mb-4 font-bold">
                            Share <span className=" italic text-2xl font-semibold text-sky-400">your</span> Thoughts
                        </h1>
                        <div className=" flex flex-row items-center justify-center gap-4">
                            <Button label="Login" onClick={loginModal.onOpen} />
                            <Button label="Register" onClick={registerModal.onOpen} secondary />
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Form;