export const LoadingSpinner = ({size}) => {
  return (
    <img
      alt="preloadImg"
      draggable="false"
      className="loading-spinner"
      style={{width: `${size}em`, height: `${size}em`, display:"flex"}}
      src="./vectors/spinner.svg"
    />
  );
};
