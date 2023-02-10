import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  PersonOutlined,
} from '@mui/icons-material';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseURL from 'baseURL';

function UserWidget({ userId, picturePath }) {
  const { mode, token, user: loggedInUser } = useSelector((state) => state);

  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`${baseURL}/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <WidgetWrapper>
      {/* ** First Row ** */}
      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => {
          navigate(`/profile/${user._id}`);
        }}
      >
        <FlexBetween gap='0.5rem'>
          <UserImage image={user.picturePath} profileId={user._id} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                '&:hover': { color: palette.primary.main, cursor: 'pointer' },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>{user.email}</Typography>
            <Typography color={medium} sx={{ marginTop: 0.5 }}>
              {loggedInUser?.friends?.length} Friends
            </Typography>
          </Box>
        </FlexBetween>
        <PersonOutlined />
      </FlexBetween>

      <Divider />

      {/* ** Second Row ** */}
      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.6rem'>
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{user.location}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.6rem'>
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{user.occupation}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* ** Third Row ** */}
      <Box p='1rem 0'>
        <FlexBetween mb='0.6rem'>
          <Typography color={medium}>Who viewed your profile</Typography>
          <Typography color={main} fontWeight='500'>
            {user.viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impression of your post</Typography>
          <Typography color={main} fontWeight='500'>
            {user.impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* ** Four Row ** */}
      <Box p='1rem 0'>
        <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
          Social Profilres
        </Typography>
        <FlexBetween
          gap='1rem'
          mb='0.5rem'
          onClick={() => {
            window.open('https://twitter.com/', '_blank');
          }}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <ArrowRightOutlinedIcon sx={{ color: main }} fontSize='large' />
        </FlexBetween>

        <FlexBetween
          onClick={() => {
            window.open('https://www.linkedin.com/', '_blank');
          }}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='twitter' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <ArrowRightOutlinedIcon sx={{ color: main }} fontSize='large' />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}

export default UserWidget;
