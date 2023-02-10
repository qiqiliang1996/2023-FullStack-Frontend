import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  // ShareOutlined,
  DeleteOutlined,
} from '@mui/icons-material';

import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from 'state';
import baseURL from 'baseURL';

const PostWidget = ({ post }) => {
  // console.log('RELOAD', post);
  const {
    _id: postId,
    userId: postUserId,
    // name,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = post;
  const name = `${firstName} ${lastName}`;
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  // console.log('11 isLiked', isLiked);
  const likeCount = Object.keys(likes).length;
  // console.log('11 likeCount', likeCount);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    console.log('00 front patchLike called');
    const response = await fetch(`${baseURL}/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    console.log('2 frontend', updatedPost);
    dispatch(setPost({ post: updatedPost }));
  };

  const patchDelete = async () => {
    console.log('delete1 ');

    const response = await fetch(`${baseURL}/posts/${postId}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const { allPostsAfterDeletion: posts } = await response.json();
    console.log('DELETE posts', posts);

    await dispatch(setPosts({ posts }));

    // console.log('DELETE response', allPostAfterDeletions);
  };

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {loggedInUserId === postUserId ? (
          <IconButton onClick={() => patchDelete()}>
            <DeleteOutlined />
          </IconButton>
        ) : null}
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          {comments.length === 0 && (
            <Typography>There is no comment.</Typography>
          )}
          {comments.length != 0 && <Divider />}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
