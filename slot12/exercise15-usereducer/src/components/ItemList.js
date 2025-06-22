import React, { useReducer, useState } from "react";
import { Button, Form, Container, Row, Col, ListGroup, InputGroup, Dropdown, DropdownButton,} from "react-bootstrap";

// Định nghĩa hàm reducer
function listReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((item) => item.id !== action.id) };
    case "EDIT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, name: action.name } : item
        ),
      };
    default:
      return state;
  }
}

// Giá trị khởi tạo
const initialState = {
  items: [],
};

function ItemList() {
  // Quản lý danh sách item với useReducer
  const [state, dispatch] = useReducer(listReducer, initialState);
  // Quản lý input, tìm kiếm, sắp xếp và chỉnh sửa với useState
  const [newItemName, setNewItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created"); // created hoặc alphabetical
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Thêm item mới
  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newItem = { id: Date.now(), name: newItemName, createdAt: new Date() };
      dispatch({ type: "ADD_ITEM", item: newItem });
      setNewItemName("");
    }
  };

  // Xóa item
  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  // Bắt đầu chỉnh sửa item
  const handleEditItem = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  // Lưu item đã chỉnh sửa
  const handleSaveEdit = (id) => {
    if (editName.trim()) {
      dispatch({ type: "EDIT_ITEM", id, name: editName });
      setEditingId(null);
      setEditName("");
    }
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  // Lọc và sắp xếp danh sách item
  const filteredAndSortedItems = state.items
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // Mới nhất trước
    });

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Item Manager</h2>

          {/* Form thêm item */}
          <Form>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter item name"
              />
              <Button variant="primary" onClick={handleAddItem}>
                Add Item
              </Button>
            </InputGroup>
          </Form>

          {/* Ô tìm kiếm */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items..."
            />
          </Form.Group>

          {/* Dropdown sắp xếp */}
          <DropdownButton
            id="dropdown-sort"
            title={`Sort by: ${sortBy === "alphabetical" ? "Alphabetical" : "Created Time"}`}
            className="mb-3"
          >
            <Dropdown.Item onClick={() => setSortBy("created")}>Created Time</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("alphabetical")}>Alphabetical</Dropdown.Item>
          </DropdownButton>

          {/* Danh sách item */}
          <h3 className="mt-4">Item List:</h3>
          <ListGroup>
            {filteredAndSortedItems.length === 0 ? (
              <ListGroup.Item>No items found</ListGroup.Item>
            ) : (
              filteredAndSortedItems.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {editingId === item.id ? (
                    <div className="w-100 d-flex gap-2">
                      <Form.Control
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSaveEdit(item.id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span>{item.name}</span>
                      <div>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditItem(item.id, item.name)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </>
                  )}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemList;