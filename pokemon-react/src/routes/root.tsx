import { Outlet } from "react-router-dom";
import Header from "$/components/Header";

export default function Root() {
  return (
    <>
      <Header />
      <div className="py-20">
        <Outlet />
      </div>
    </>
  );
}
