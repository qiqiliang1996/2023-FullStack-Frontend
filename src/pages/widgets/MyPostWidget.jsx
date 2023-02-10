import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import baseURL from 'baseURL';

function MyPostWidget({ userId, picturePath }) {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const { palette } = useTheme();
  // const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    console.log('1!! image', image);
    // return;

    if (!post) {
      alert('Please insert post description before post.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('description', post);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    const response = await fetch(`${baseURL}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    if (posts?.error) {
      console.log('1GOOD! posts', posts);
      return;
    }

    await dispatch(setPosts({ posts }));
    setImage(null);
    setPost('');
    // alert('Congrat! You made a post successfully!');
  };
  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} profileId={userId} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      <Divider sx={{ margin: '1.25rem 0' }} />

      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          mb='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles='.jpg,.jpeg,.png'
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width={image ? '90%' : '100%'}
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '8%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <FlexBetween>
        <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Attach Image
          </Typography>
        </FlexBetween>

        <Button
          onClick={handlePost}
          sx={{
            color: post ? palette.background.alt : 'red',
            backgroundColor: post ? palette.primary.main : '#F0F0F0',
            borderRadius: '3rem',
            '&:hover': {
              cursor: post ? 'pointer' : 'default',
              color: post ? 'medium' : 'red',
              backgroundColor: post ? palette.primary.main : '#F0F0F0',
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default MyPostWidget;
