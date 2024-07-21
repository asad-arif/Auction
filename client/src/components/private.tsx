import { Navigate } from "react-router-dom";

const Private = ({ Component }: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user?.name) {
    return <Component />;
  }
  return <Navigate to={"/login"} />;
};

export default Private;
