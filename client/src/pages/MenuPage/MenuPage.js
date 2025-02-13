import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Menu.css";
import axios from "axios";

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [editingMenuID, setEditingMenuID] = useState(null);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [addMenuBox, setAddMenuBox] = useState(false);

  // Fetch all menus from the backend
  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/menus"); // Replace with your API endpoint
      setMenus(response.data);
    } catch (error) {
      console.error(
        "Error fetching menus:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleAddMenu = async () => {
    if (!newMenu.name || !newMenu.description || !newMenu.price || !newMenu.category) {
      alert("Please fill in all the fields.");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", newMenu.name);
    formData.append("description", newMenu.description);
    formData.append("price", newMenu.price);
    formData.append("category", newMenu.category);
    if (newMenu.image) {
      formData.append("image", newMenu.image);
    }
  
    try {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      if (editingMenuID) {
        // Update existing menu
        const response = await axios.post(
          `http://localhost:8000/api/menus/update/${editingMenuID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMenus(
          menus.map((menu) =>
            menu.menuID === editingMenuID ? response.data : menu
          )
        );
      } else {
        // Add new menu
        const response = await axios.post(
          "http://localhost:8000/api/menus",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMenus([...menus, response.data]);
      }
  
      // Reset state
      setNewMenu({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
      setAddMenuBox(false);
      setEditingMenuID(null); 
    } catch (error) {
      console.error("Error saving menu:", error.response?.data || error.message);
      if (error.response) {
        console.log("Response data:", error.response.data);
      }
    }
   
  };
  

  const handleEdit = (menu) => {
    setNewMenu({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      image: null, 
    });
    setAddMenuBox(true); 
    setEditingMenuID(menu.menuID); 
  };
  
  

  const handleDelete = async (menuID) => {
    try {
      console.log(menuID);
      axios.delete(`http://localhost:8000/api/menus/${menuID}`).then(() => {
        setMenus(menus.filter((menu) => menu.menuID !== menuID)); // Remove from state
      });
    } catch (error) {
      console.error("Error deleting menu:", error);
      console.log(error.error);
      console.log(error.message);
      alert("There was an error deleting the menu.");
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="menu-container">
        <div className="header">
          <h2>Manage Menu</h2>
          <button className="add-menu" onClick={() => setAddMenuBox(true)}>
            Add New Menu
          </button>
        </div>
        <div className="menu-list">
          {menus.map((menu) => (
            <div key={menu.menuID} className="menu-card">
              <div className="menu-info">
                <div className="Image-container">
                  <img
                    src={
                      menu.image
                        ? `http://localhost:8000/storage/${menu.image}`
                        : "placeholder.jpg"
                    }
                    alt={menu.name}
                    className="menu-image"
                  />
                </div>
                <div className="menu-details">
                  <h3 className="menu-name">{menu.name}</h3>
                  <p className="menu-description">{menu.description}</p>
                  <p className="menu-category">
                    <strong>Category:</strong> {menu.category}
                  </p>
                  <p className="menu-price">
                    <strong>Price:</strong> ${menu.price}
                  </p>
                  <p className="menu-created-at">
                    <strong>Created At:</strong>{" "}
                    {new Date(menu.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(menu)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(menu.menuID)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {addMenuBox && (
  <>
    <div
      className="add-menu-box-overlay"
      onClick={() => {
        setAddMenuBox(false);
        setEditingMenuID(null);
      }}
    ></div>
    <div className="add-menu-box">
      <h3>{editingMenuID ? "Edit Menu" : "Add New Menu"}</h3>
      <input
        type="text"
        placeholder="Name"
        value={newMenu.name}
        onChange={(e) =>
          setNewMenu({ ...newMenu, name: e.target.value })
        }
      />
      <textarea
        placeholder="Description"
        value={newMenu.description}
        onChange={(e) =>
          setNewMenu({ ...newMenu, description: e.target.value })
        }
      ></textarea>
      <input
        type="number"
        placeholder="Price"
        value={newMenu.price}
        onChange={(e) =>
          setNewMenu({ ...newMenu, price: e.target.value })
        }
      />
      <select
        value={newMenu.category}
        onChange={(e) =>
          setNewMenu({ ...newMenu, category: e.target.value })
        }
        className="category-dropdown"
      >
        <option value="">Select Category</option>
        <option value="Main Course">Main Course</option>
        <option value="Appetizer">Appetizer</option>
        <option value="Dessert">Dessert</option>
        <option value="Beverage">Beverage</option>
      </select>

      <input
        type="file"
        onChange={(e) =>
          setNewMenu({ ...newMenu, image: e.target.files[0] })
        }
      />
      <div className="actions">
        <button className="save-btn" onClick={handleAddMenu}>
          Save
        </button>
        <button
          className="cancel-btn"
          onClick={() => {
            setAddMenuBox(false);
            setEditingMenuID(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </>
)}

      </div>
    </div>
  );
};

export default MenuPage;
