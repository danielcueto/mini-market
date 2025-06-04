import { NavLink } from "react-router-dom";


export function SwitchRole() {
  return (
    <nav>
      <NavLink to="/" className="mr-6 border-r-2 pr-6 hover:underline">Home</NavLink>
      <NavLink to="/admin" className=" hover:underline">Admin</NavLink>
    </nav>
  );
}
