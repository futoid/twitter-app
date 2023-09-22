import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import axios from "axios";
import toast from "react-hot-toast";

const useLike = ({postId , userId} : {postId : string , userId : string}) => {
    const {data: currentUser} = useCurrentUser();
    const {data : fetchedPost , mutate:mutateFetchedPost} = usePost(postId);
    const {mutate : mutateFetchedPosts} = usePost(userId);
    const loginModal = useLoginModal();
    
    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.likedIds , fetchedPost?.likedIds]);

    const toggleLike = useCallback(async() => {
        if(!currentUser){
            loginModal.onOpen();
        }
        try{
            let request;

            if(hasLiked){
                request = () => axios.delete('/api/like' , {data : {postId}});
            }
            else{
                request = () => axios.post('/api/like' , {postId});
            }

            await request();
            mutateFetchedPosts();
            mutateFetchedPost();

            if(hasLiked){
                toast.success('Like removed');
            }
            else{
                toast.success('Liked');
            }
        }
        catch(error){
            console.log(error);
        }


    }, [
        currentUser,
        loginModal,
        hasLiked,
        mutateFetchedPost,
        mutateFetchedPosts,
        postId
    ])

    return {
        hasLiked,
        toggleLike
    }

}

export default useLike;