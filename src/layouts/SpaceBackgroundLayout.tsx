import { Outlet } from "react-router-dom";

export function SpaceBackgroundLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/events_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Outlet />
    </div>
  );
}
