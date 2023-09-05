import {
  useDeleteExistUserMutation,
  useGetAllUsersQuery,
} from "../redux_toolkit/slices/Users";
import { BiSolidEditAlt } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
const Users = ({inputValues}) => {
  const { data: users = [] } = useGetAllUsersQuery();
  const [deleteExistUser] = useDeleteExistUserMutation();
  console.log("users", users);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete")) {
      deleteExistUser(id);
    }
  };
  return (
    <table className="w-full table-fixed border-collapse border mt-10">
      <thead>
        <tr>
          <th className="text-start border p-2 bg-blue-500 text-white">#</th>
          <th className="text-start border p-2 bg-blue-500 text-white">Name</th>
          <th className="text-start border p-2 bg-blue-500 text-white">Bio</th>
          <th className="text-start border p-2 bg-blue-500 text-white">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.filter( data => {
			return data?.name.toLowerCase().includes(inputValues.toLowerCase())
		}).map((res) => {
          return (
            <tr key={res?.id}>
              <td className="text-start border p-2">{res?.id}</td>
              <td className="text-start border p-2">{res?.name}</td>
              <td className="text-start border p-2">{res?.bio}</td>
              <td className="text-start border p-2 flex flex-row justify-start items-center gap-2">
                <Link to='/Add_Info' className="p-2 rounded shadow bg-blue-500 text-white" state={res}>
                  <BiSolidEditAlt />
                </Link>
                <button
                  className="p-2 rounded shadow bg-red-500 text-white"
                  onClick={() => handleDelete(res?.id)}
                >
                  <TiDelete />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Users;
