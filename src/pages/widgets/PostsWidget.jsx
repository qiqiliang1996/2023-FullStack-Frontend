import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';
import { Typography, useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import baseURL from 'baseURL';

function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // console.log('??', posts);

  const { palette } = useTheme();
  const main = palette.neutral.main;

  const getPosts = async () => {
    const response = await fetch(`${baseURL}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log('ALL posts data', data);

    if (data?.error) {
      console.log('hi getPosts error', data?.error);
      return;
    }

    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    // console.log('1 single user posts called');
    const response = await fetch(`${baseURL}/posts/${userId}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log('2 data post', data);
    if (data?.error) {
      console.log('hi getPosts error', data?.error);
      return;
    }
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts?.length === 0 ? (
        <WidgetWrapper m='2rem 0'>
          <Typography color={main} fontWeight='500'>
            This User does't have any post.
          </Typography>
        </WidgetWrapper>
      ) : (
        posts?.map((post) => <PostWidget key={post._id} post={post} />)
      )}
    </>
  );
}

export default PostsWidget;
