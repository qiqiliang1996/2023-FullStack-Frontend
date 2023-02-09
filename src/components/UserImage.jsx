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
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
