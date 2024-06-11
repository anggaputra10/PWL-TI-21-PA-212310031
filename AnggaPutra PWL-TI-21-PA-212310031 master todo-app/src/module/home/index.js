import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Modal from "./components/Modal";
import axios from "axios";

export default function Home() {
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [form, setForm] = useState({ task: "" });
  const [arr, setArr] = useState([]); // Memperbarui state arr
  const [id, setId] = useState();

  const handleAddButtonClick = () => {
    setIsAdd(true);
  };

  const handleDeleteButtonClick = (data) => {
    setForm({task: data.task});
    setId(data.id);
    setIsDelete(true);
  };

  const handleUpdateButtonClick = (data) => {
    setForm({task: data.task});
    setId(data.id);
    setIsUpdate(true);
  };

  const handleClose = () => {
    setIsAdd(false);
    setIsUpdate(false);
    setIsDelete(false);
    setForm({ task: "" });
  };

  const handleChange = (e) => {
    setForm({ task: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = form;
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://648abed517f1536d65e9947d.mockapi.io/api/todo',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      alert("Add task success");
      getData();
      handleClose();
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    let data =form;
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://648abed517f1536d65e9947d.mockapi.io/api/todo/${id}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      alert("Update success");
      getData();
      handleClose();
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  const handleDelete = (e) => {
    e.preventDefault();
    
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://648abed517f1536d65e9947d.mockapi.io/api/todo/${id}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      alert("Delete Success");
      getData();
      handleClose();
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  const getData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://648abed517f1536d65e9947d.mockapi.io/api/todo',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      setArr(response.data);
    })
    .catch((error) => {
      console.log(error);
    });    
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-5">Todo APP</h2>
      <div className="d-flex justify-content-end mb-3">
        <Button
          name="Add Data"
          class="bg-primary rounded-2 py-2 px-5 text-white border-0"
          click={handleAddButtonClick}
        />
      </div>

      <div>
        {arr.map((e) => (
          <Card
            key={e.id}
            todo={e.task}
            update={() => {
              handleUpdateButtonClick({ id: e.id, task: e.task });
            }}
            del={() => {
              handleDeleteButtonClick({ id: e.id, task: e.task });
            }}
          />
        ))}
      </div>

      {/* Add data */}
      {isAdd ? (
        <Modal title="Add Task" close={handleClose}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="task"
                name="task"
                value={form.task}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {/* Update */}
      {isUpdate ? (
        <Modal title="Update Task" close={handleClose}>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="task"
                name="task"
                value={form.task}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {/* Delete */}
      {isDelete ? (
        <Modal title="Delete Task" close={handleClose}>
          <form onSubmit={handleDelete}>
            <div className="mb-3">
              Are you sure to delete task <b>{form.task}</b>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Delete
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
