import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'pages/navbar/Navbar';

import PostsWidget from 'pages/widgets/PostsWidget';
import UserWidget from 'pages/widgets/UserWidget';
import baseURL from 'baseURL';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  // const posts = useSelector((state) => state.posts);

  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  const getUser = async () => {
    const response = await fetch(`${baseURL}/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log('!! ProfilePageuser data ', data);
    setUser(data);
  };

  useEffect(() => {
    // console.log('useEffect');
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='3rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0' />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? '-2rem' : '2rem'}
        >
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
