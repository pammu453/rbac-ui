import { Button, TextInput, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const AddUser = ({ closeModal, userData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Active");
    const { addUser, editUser } = useUser();

    useEffect(() => {
        if (userData) {
            setName(userData.name);
            setEmail(userData.email);
            setRole(userData.role);
            setStatus(userData.status);
        }
    }, [userData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { id: userData?.id || Date.now(), name, email, role, status };
        console.log(user)

        if (userData) {
            editUser(user.id, user);
        } else {
            addUser(user);
        }

        closeModal();
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Name"
                    placeholder="Enter user name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Select
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="">Select a role</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </Select>
                <Select
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </Select>
                <Button type="submit" gradientDuoTone="tealToLime">
                    {userData ? "Update User" : "Add User"}
                </Button>
            </form>
        </div>
    );
};

export default AddUser;
