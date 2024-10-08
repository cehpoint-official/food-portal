import { useState } from "react";
import Dashboard from "../component/Dashboard";
import Sidebar from "../component/Sidebar";

const Home = () => {
  const [show, setShow] = useState(window.innerWidth >= 600 ? true : false);
  const toggle = (e) => setShow(!show);
  return (
    <div className='flex items-start'>
      <Sidebar toggle={toggle} show={show} />
      <Dashboard toggle={toggle} show={show} />
    </div>
  );
};

export default Home;
