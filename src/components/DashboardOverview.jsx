import { HiOutlineUserGroup, HiUserCircle, HiShieldCheck } from "react-icons/hi";
import { useRole } from "../context/RoleContext";
import { useUser } from "../context/UserContext";
import { usePermission } from "../context/PermissionContext";
import StatCard from "./StatCard";
import TableCard from "./TableCard";

const DashboardComponent = () => {
    const rows = 3
    const { roles } = useRole();
    const { users } = useUser();
    const { permissions } = usePermission();

    return (
        <div className="p-4">
            <div className="flex-wrap flex gap-4 justify-center">
                <StatCard
                    title="Total Users"
                    value={users?.length}
                    gradientFrom="teal-400"
                    gradientTo="blue-600"
                    Icon={HiOutlineUserGroup}
                />
                <StatCard
                    title="Total Roles"
                    value={roles?.length}
                    gradientFrom="indigo-400"
                    gradientTo="purple-600"
                    Icon={HiUserCircle}
                />
                <StatCard
                    title="Total Permissions"
                    value={permissions?.length}
                    gradientFrom="lime-400"
                    gradientTo="green-600"
                    Icon={HiShieldCheck}
                />
            </div>

            <div className="flex flex-wrap gap-x-20 gap-y-8 py-5 justify-center">
                <TableCard
                    title="Users"
                    gradientFrom="teal-400"
                    gradientTo="blue-600"
                    data={users}
                    columns={[
                        { header: 'ID', accessor: (user) => user.id },
                        { header: 'Username', accessor: (user) => user.name },
                        { header: 'Role', accessor: (user) => user.role },
                        { header: 'Status', accessor: (user) => user.status },
                    ]}
                    link="/users"
                    rows={rows}
                />

                <TableCard
                    title="Roles"
                    gradientFrom="indigo-400"
                    gradientTo="purple-600"
                    data={roles}
                    columns={[
                        { header: 'ID', accessor: (role) => role.id },
                        { header: 'Role Name', accessor: (role) => role.name },
                        { header: 'Description', accessor: (role) => role.description },
                    ]}
                    link="/roles"
                    rows={rows}
                />

                <TableCard
                    title="Permissions"
                    gradientFrom="lime-400"
                    gradientTo="green-600"
                    data={permissions}
                    columns={[
                        { header: 'ID', accessor: (permission) => permission.id },
                        { header: 'Permission', accessor: (permission) => permission.name },
                        { header: 'Description', accessor: (permission) => permission.role },
                    ]}
                    link="/permissions"
                    rows={rows}
                />
            </div>
        </div>
    ); 
};

export default DashboardComponent;