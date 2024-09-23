const Avatar = ({ src }) => {
  return (
    <img
      src={
        src ||
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      }
      alt="Admin Avatar"
      className="h-10 w-10 rounded-full"
    />
  );
};

export default Avatar;
