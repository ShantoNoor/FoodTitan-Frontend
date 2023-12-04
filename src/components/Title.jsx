import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | FoodTitan</title>
    </Helmet>
  );
};

export default Title;
