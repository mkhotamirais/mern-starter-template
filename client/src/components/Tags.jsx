import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Button = ({ children = "button", type = "button", disabled, onClick, className }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`${className} bg-blue-500 text-white leading-none p-2 rounded hover:opacity-70 disabled:opacity-70`}
  >
    {children}
  </button>
);
Button.propTypes;

export const Prev = ({ className }) => (
  <Link to={-1}>
    <div className={`${className} hover:text-blue-500`}>
      <FaArrowLeft />
    </div>
  </Link>
);
Prev.propTypes;

export const H1 = ({ children, className }) => (
  <h1 className={`${className} capitalize font-semibold text-2xl leading-loose`}>{children}</h1>
);
H1.propTypes;

export const H2 = ({ children, className }) => (
  <h2 className={`${className} capitalize font-semibold text-xl`}>{children}</h2>
);
H2.propTypes;

export const H3 = ({ children, className }) => <h3 className={`${className} capitalize font-medium`}>{children}</h3>;
H3.propTypes;

export const Pre = ({ children }) => <pre className={`overflow-x-scroll text-xs`}>{children}</pre>;
Pre.propTypes;

export const Label = ({ children = "label", id, className }) => (
  <label htmlFor={id} className={`${className} capitalize font-medium leading-loose block`}>
    {children}
  </label>
);
Label.propTypes;

export const Input = ({ type = "text", id, value, onChange, placeholder, className }) => (
  <input
    type={type}
    id={id}
    name={id}
    value={value}
    onChange={onChange}
    className={`${className} border rounded p-2 w-full focus:outline-slate-400`}
    placeholder={placeholder}
  />
);
Input.propTypes;

export const Textarea = ({ id, value, onChange, placeholder, className }) => (
  <textarea
    id={id}
    name={id}
    value={value}
    onChange={onChange}
    className={`${className} rounded p-2 border w-full focus:outline-slate-400`}
    placeholder={placeholder}
  />
);
Textarea.propTypes;

export const Select = ({ children, value, onChange, className }) => (
  <select className={`${className} border rounded w-full p-2`} value={value} onChange={onChange}>
    <option value="">--Select user--</option>
    {children}
  </select>
);
Select.propTypes;
