import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prismadb";
import serverAuth from "../../libs/serverAuth";


export default async function handler(req : NextApiRequest , res : NextApiResponse) {
    if(req.method !== 'POST' && req.method !== 'DELETE'){
        return res.status(405).end();
    }

try {
    const {postId} = req.body;
    const {currentUser} = await serverAuth(req,res);
    if(!postId || typeof postId !== 'string'){
        throw new Error("Invalid Post ID")
    }

    const post = await prisma?.post.findUnique({
        where : {
            id : postId
        }
    })

    if(!post){
        throw new Error("No Post found");
    }

    let updatedLikedIds = [...(post.likedIds || []) ];

    if(req.method === 'POST'){
        updatedLikedIds.push(currentUser.id);
    }

    if(req.method === 'DELETE'){
        updatedLikedIds = updatedLikedIds.filter((ids) => ids !== currentUser.id);
    }

    const updatedPost = await prisma?.post.update({
        where : {
            id : postId
        },
        data : {
            likedIds : updatedLikedIds
        }
    })

    return res.status(200).json(updatedPost);

} catch (error) {
    console.log(error);
}{

}

}