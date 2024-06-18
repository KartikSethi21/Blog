import React, { useEffect, useState } from 'react'
import service from '../appwrite/configs'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Container } from '../components';
import parse  from 'html-react-parser';
function Post() {
    const [post,setPosts]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData);
    const isAuthor=post && userData ? post.userId ===userData.$id :false;
    useEffect(()=>{  
        if(slug){
        service.getPosts(slug).then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
    }else{
        navigate(`/`)
    }
},[slug,navigate]);

const deletePost=()=>{
    service.deletePost(post.$id).then((status)=>{
        if(status){
            service.deleteFile(post.featuredImage);
            navigate("/");
        }
    });
};
  return post?(
    <div className='py-8'>
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img 
                src={service.getFilePreview(post.featuredImage)}
                 alt={post.title}
                 className='rounded-xl ' />

                 {
                    isAuthor &&(
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                            <Button
                             bgColor='bg-green-500'
                             className='mr-3'>
                                Edit
                             </Button>
                            </Link>
                            <Button 
                            bgColor='bg-red-500' 
                            onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )
                 }
            </div>
            <div className='browser-css'>
            {parse(post.content)}
            </div>
        </Container>
    </div>
  ):null;
}

export default Post