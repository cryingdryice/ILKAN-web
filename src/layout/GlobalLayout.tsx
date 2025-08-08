import { Outlet } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <div style={{ width: "100vw" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            backgroundColor: "red",
            width: "250px",
            height: "100vh",
          }}
        >
          사이드바
        </div>
        <div style={{ flex: "1" }}>
          <div
            style={{ width: "100%", backgroundColor: "blue", height: "80px" }}
          >
            header
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
