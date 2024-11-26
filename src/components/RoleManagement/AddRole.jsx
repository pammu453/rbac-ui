import { Button, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useRole } from "../../context/RoleContext";

const AddRole = ({ closeModal, roleData }) => {
    const { addRole, editRole } = useRole();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (roleData) {
            setName(roleData.name);
            setDescription(roleData.description);
        }
    }, [roleData]);

    const handleAddOrEditRole = (e) => {
        e.preventDefault();

        const role = {
            id: roleData?.id || Date.now().toString(),
            name,
            description,
        };

        if (roleData) {
            editRole(role.id, role); 
        } else {
            addRole(role);
        }
        closeModal();
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <form onSubmit={handleAddOrEditRole} className="space-y-4">
                <TextInput
                    label="Role Name"
                    placeholder="Enter role name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextInput
                    label="Description"
                    placeholder="Enter role description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" gradientDuoTone="tealToLime">
                    {roleData ? "Update Role" : "Add Role"}
                </Button>
            </form>
        </div>
    );
};

export default AddRole;
