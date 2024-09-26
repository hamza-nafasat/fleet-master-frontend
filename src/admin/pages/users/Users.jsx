import React, { useState } from "react";
import { users } from "../../../data/data";
import UserCard from "./UserCard";
import Modal from "../../../components/modal/Modal";
import AddUser from "./AddUser";

const Users = () => {
    const [modal, setModal] = useState(false);

    const modalOpenHandler = () => setModal(true)
    const modalCloseHandler = () => setModal(false)

  return (
    <div className="bg-[rgba(245,244,244,1)] rounded-[16px] p-4">
      <div className="flex justify-end">
        <button
            onClick={modalOpenHandler}
          className="w-[107px] h-[37px] grid place-items-center bg-[rgba(0,107,206,1)] rounded-xl text-white
        text-sm" 
        >
          + Add User
        </button>
      </div>
      <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, i) => (
            <UserCard key={i} user={user} />
        ))}
      </div>
      {modal && (
        <Modal onClose={modalCloseHandler} width={{xs:'310px', sm:'800px', lg:'1200px', xl:'1400px'}}>
            <AddUser onClose={modalCloseHandler} />
        </Modal>
      )}
    </div>
  );
};

export default Users;
