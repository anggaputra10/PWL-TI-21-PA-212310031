import React from "react";
import { Pencil, Trash } from "react-bootstrap-icons";

export default function Card({ todo, update, del }) {
  return (
    <div>
      <div className="p-2 border border-2 rounded-2 mb-2 d-flex justify-content-between">
        <div>{todo}</div>
        <div className="d-flex">
          <div className="me-2">
            <Pencil
              className="text-success"
              style={{ cursor: "pointer" }}
              onClick={update}
            />
          </div>
          <div>
            <Trash
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={del}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
