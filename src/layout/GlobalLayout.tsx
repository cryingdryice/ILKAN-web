import { Outlet } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <div>
      <h1>GlobalLayout</h1>
      <Outlet />
    </div>
  );
}
