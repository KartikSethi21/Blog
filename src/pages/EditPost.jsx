import React, { useEffect, useState } from 'react';
import { Container,PostForm } from '../components';
import service from '../appwrite/configs';
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const [post,setPosts]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();
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
    },[slug,navigate])
  return post ?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost