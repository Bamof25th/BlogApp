import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className="bg-white text-gray-500 dark:text-gray-200 dark:bg-[rgb(14,23,42)]">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
