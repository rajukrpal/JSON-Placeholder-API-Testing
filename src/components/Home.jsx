import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  deleteJsonPlasholterApiData,
  getJsonPlasholterApiData,
  putJsonPlasholterApiData,
} from "../data/data";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

const Home = () => {
  const [AllApiDataGet, setAllApiDataGet] = useState([]);
  const [felterData, setFelterData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [formData, setFormData] = useState({ title: "", userId: "", id: "" });
  const [showModal, setShowModal] = useState(false);

  // DATA KO SHOW KARWANE KE LIYE GET API CALL
  useEffect(() => {
    const GetFeatchApi = async () => {
      const res = await getJsonPlasholterApiData();
      const Data = res.data;
      setAllApiDataGet(Data);
      setFelterData(Data);
    };
    GetFeatchApi();
  }, []);

  // SEARCH FUNCTION  SEARCH....... KARNE PAR DATA FILTAR HO KE AAYE
  useEffect(() => {
    const searchResult = AllApiDataGet.filter(
      (user) =>
        user.title.toLowerCase().includes(searchData.toLowerCase()) ||
        user.userId.toString().includes(searchData)
    );
    setFelterData(searchResult);
  }, [AllApiDataGet, searchData]);

  // EDIT FORM DATA YE html ME onChange PAR WORK KAREGA
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // DELETE FUNCTION
  const handleDeleteOneUserData = async (oneUser) => {
    const res = await deleteJsonPlasholterApiData(oneUser.id);
    const feltarDeleteData = AllApiDataGet.filter(
      (user) => user.id !== oneUser.id
    );
    setAllApiDataGet(feltarDeleteData);
  };

  // ---EDIT--- PAR CLICK KARNE PAR MODAL KHULEGA VALUE KE SATH ES KE LIYE FUNCTION
  const handleEditOneUserData = async (oneUser) => {
    setFormData({
      title: oneUser.title,
      userId: oneUser.userId,
      id: oneUser.id,
    });
    setShowModal(true);
  };

  // EDIT SAVE
  const handleSaveChanges = async () => {
    const res = await putJsonPlasholterApiData(formData.id);
    const updatedData = AllApiDataGet.map((user) =>
      user.id === formData.id ? { ...user, ...formData } : user
    );
    setAllApiDataGet(updatedData);
    setFelterData(updatedData);
    setShowModal(false);
  };

  return (
    <div className="p-3">
      <div className="py-3">
        <center>Json Placeholder Data</center>
      </div>
      <div>
        {/* SEARCH CODE START */}
        <div>
          <div className="flex py-3">
            <span className="flex border border-black items-center rounded">
              <input
                placeholder="Search..."
                className="p-2 outline-none rounded-md "
                type="search"
                onChange={(e) => setSearchData(e.target.value)}
              />{" "}
              <IoSearchOutline size={23} />
            </span>
          </div>
        </div>
        {/* SEARCH CODE END */}
      </div>
      {/* ------OPEN MODAL START------ */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <label className="px-3" htmlFor="">
          <strong>Title</strong>
        </label>
        <Modal.Body>
          <textarea
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            placeholder="User ID"
            className="form-control mb-2 w-100"
            rows="3" // Adjust the number of rows as needed
          />
        </Modal.Body>
        <label className="px-3" htmlFor="">
          <strong>UserID</strong>
        </label>
        <Modal.Body>
          <input
            className="w-full p-2"
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleFormChange}
            placeholder="User ID"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ------OPEN MODAL END------ */}

      {/* ------START TABLE------ */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Contents</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {felterData.map((user, index) => (
            <tr key={user.id}>
              <td>{(index += 1)}</td>
              <td>{user.id}</td>
              <td>{user.userId}</td>
              <td>{user.title}</td>
              <td>{user.body}</td>
              <td>
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleEditOneUserData(user)}
                  >
                    <FaRegEdit size={22} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteOneUserData(user)}
                  >
                    <MdDeleteForever size={22} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* ------END TABLE------ */}
    </div>
  );
};

export default Home;
