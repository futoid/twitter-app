import { useRouter } from "next/router";
import usePost from "../../hooks/usePost";
import { ClipLoader } from "react-spinners";
import Header from "../../components/Header";
import PostItem from "../../components/Posts/PostItem";
import Form from "../../components/Form";
import useCurrentUser from "../../hooks/useCurrentUser";
import CommentFeed from "../../components/Posts/commentFeed";

const PostView = () => {
    const currentUser = useCurrentUser();
    const router = useRouter();
    const {postId} = router.query;

    const {data : fetchedPost , isLoading} = usePost(postId as string);
    
    if(isLoading || !fetchedPost){
        return(
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }

    return ( 
        <div>
            <Header label="Tweet" showBackArrow/>
            <PostItem data={fetchedPost} userId={currentUser?.data.id}/>
            <Form 
                postId={postId as string}
                isComment = "true"
                placeholder="Your reply"
            />
            <CommentFeed comments={fetchedPost?.comments}/>
        </div>
     );
}
 
export default PostView;