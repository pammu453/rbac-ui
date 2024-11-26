import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardOverview from "./components/DashboardOverview";
import NavBar from "./components/Navbar";
import PermissionList from "./components/Permissions/PermissionsList";
import RoleList from "./components/RoleManagement/RoleList";
import UserList from "./components/UserManagement/UserList";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/permissions" element={<PermissionList />} />
        <Route path="/roles" element={<RoleList />} />
      </Routes>
    </Router>
  );
};

export default App;
