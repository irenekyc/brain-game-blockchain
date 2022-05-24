import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout" data-testid="layout">
      {children}
    </div>
  );
};

export default Layout;
