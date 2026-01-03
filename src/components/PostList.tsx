import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase-client';
import PostItem from './PostItem';

export interface Post {
    id: number;
    title: string;
    content: string;
    image_url: string;
    created_at: string;
    avatar_url: string;
    likes: number;
}

const fetchPosts = async (): Promise<Post[]> => {
    const {data, error} = await supabase.from('Posts').select('*').order('created_at', {ascending: false});
    if (error) {
        throw new Error("Error fetching posts: " + error.message);
    }
    return data as Post[];
};

const PostList = () => {
    const {data, error, isLoading} = useQuery<Post[], Error>({
        queryKey: ["posts"], 
        queryFn: fetchPosts
    });

    if (isLoading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>;
    }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((post) => (
            <PostItem key={post.id} post={post}/>
        ))}
    </div>
  )
}

export default PostList
