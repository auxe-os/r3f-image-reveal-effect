import PropTypes from "prop-types";

const CodropsOverlay = ({ isDarkMode }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full flex flex-col justify-between p-7 text-xs z-30"
      style={{
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      <div className="flex flex-col w-full gap-4 max-sm:gap-2">
      </div>
    </div>
  );
};

CodropsOverlay.propTypes = {
  isDarkMode: PropTypes.bool,
};

export default CodropsOverlay;
