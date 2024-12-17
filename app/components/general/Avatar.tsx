import { RxAvatar } from 'react-icons/rx';

interface AvatarProps {
  image?: string; // Optional image URL
  altText?: string; // Optional alt text for accessibility
  size?: string; // Optional size for avatar (e.g., '40px')
}

const Avatar: React.FC<AvatarProps> = ({ image, altText = 'User Avatar', size = '40px' }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
  } as React.CSSProperties;

  return image ? (
    <img src={image} alt={altText} style={avatarStyle} />
  ) : (
    <div
      style={{
        ...avatarStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
      }}
    >
      <RxAvatar size={size} />
    </div>
  );
};

export default Avatar;