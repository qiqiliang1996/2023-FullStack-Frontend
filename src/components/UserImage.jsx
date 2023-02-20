import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserImage = ({ image, size = '60px', profileId }) => {
  const navigate = useNavigate();

  return (
    <Box
      width={size}
      height={size}
      onClick={() => {
        navigate(`/profile/${profileId}`);
        navigate(0);
      }}
      sx={{
        '&:hover': { cursor: 'pointer' },
      }}
    >
      <img
        alt='user'
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        src={`/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
