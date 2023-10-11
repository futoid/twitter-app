import { useCallback, useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useUser from "../../hooks/useUser";
import { toast } from "react-hot-toast";
import axios from "axios";
import useEditModal from "../../hooks/useEditModal";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const {data : currentUser} = useCurrentUser();
    const {mutate : mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage , setProfileImage] = useState('');
    const [name , setName] = useState('');
    const [username , setUsername] = useState('');
    const [coverImage , setCoverImage] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setCoverImage(currentUser?.coverImage);
        setBio(currentUser?.bio);
    }, [
        currentUser?.profileImage,
        currentUser?.name,
        currentUser?.username,
        currentUser?.coverImage,
        currentUser?.bio
    ]);

    const [isLoading, setIsLoading] = useState(false);
    
    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);

            await axios.patch("/api/edit", {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })
            
            mutateFetchedUser();

            toast.success("Updated");
            editModal.onClose();
        }
        catch(error){
            toast.error("Something went wrong!");
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }, [name, username, bio, profileImage, coverImage, editModal, mutateFetchedUser]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                value = {profileImage}
                disabled = {isLoading}
                onChange = {(image) => setProfileImage(image)}
                label = "Upload Profile Image"
            />
            <ImageUpload
                value = {coverImage}
                disabled = {isLoading}
                onChange = {(image) => setCoverImage(image)}
                label = "Upload Cover Image"
            />
            <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input 
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return ( 
        <Modal 
            disabled = {isLoading}
            isOpen = {editModal.isOpen}
            title="Edit you profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
     );
}
 
export default EditModal;