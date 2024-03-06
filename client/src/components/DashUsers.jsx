// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck ,FaTimes} from 'react-icons/fa';
const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          if (data.length < 9) {
            setShowMore(false);
          }
          setUsers(data.usersWithoutPass);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handelShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.usersWithoutPass]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
    const handelDeleteUser = async () => {}
  //     setShowModal(false);
  //     try {
  //       const res = await fetch(
  //         `/api/user/deletepost/${userIdToDelete}/${currentUser._id}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );
  //       const data = await res.json();
  //       if (!res.ok) {
  //         console.log(data.message);
  //       } else {
  //         setUserPosts((prev) =>
  //           prev.filter((post) => post._id !== postIdToDelete)
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0   ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell> Date Created </Table.HeadCell>
              <Table.HeadCell> User Image </Table.HeadCell>
              <Table.HeadCell> User Name </Table.HeadCell>
              <Table.HeadCell> Email </Table.HeadCell>
              <Table.HeadCell> Adimn </Table.HeadCell>
              <Table.HeadCell> Delete </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white  dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        className="w-10 h-10 object-cover rounded-full bg-gray-500"
                        src={user.profilePicture}
                        alt={user.username}
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>
                     {user.email}
                    </Table.Cell>
                    <Table.Cell>
                     {user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="text-red-500 font-medium hover:underline cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handelShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className=""> You have no Post</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={"md"}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-400 dark:text-gray-200 ">
              Are you shure you want to delete the account?
            </h3>
            <div className="h-8 flex justify-center gap-7">
              <Button color="success" onClick={handelDeleteUser} >
                {"Yes, I'am sure"}
              </Button>
              <Button color="failure" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashUsers;
