import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../libs/serverAuth";
import prisma from "../../libs/prismadb";

export default async function handler( 
    req : NextApiRequest,
    res : NextApiResponse
) {
    
    if(req.method !== 'POST' && req.method !== 'DELETE' ){
        return res.status(405).end();
    }

    try{
        const {currentUser} = await serverAuth(req, res); 
        const {userId} = req.body;
        
        if(!userId || typeof userId !== 'string'){
            throw new Error('Invalid ID');
        }

        const user = await prisma?.user.findUnique({
            where : {
                id : currentUser.id
            }
        })
         
        if(!user){
            throw new Error('Invalid ID');
        }

        let updatedFollowingTds = [...(user.followingIds || [])];

        if(req.method === 'POST'){
            updatedFollowingTds.push(userId);
        }
        if(req.method === 'DELETE'){
            updatedFollowingTds = updatedFollowingTds.filter(followingId => followingId !== userId);
        }

        const updatedUser = await prisma?.user.update({
            where : {
                id : currentUser.id
            },
            data : {
                followingIds : updatedFollowingTds
            }
        });

        return res.status(200).json(updatedUser);
    }
    catch(error){
        console.log(error);
        return res.status(400).end();
    }

}

