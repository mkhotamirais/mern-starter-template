import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const Prev = () => {
  return (
    <Link to={-1}>
      <FaChevronLeft />
    </Link>
  );
};

export default Prev;
