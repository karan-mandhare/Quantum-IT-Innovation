import { Employee } from "../model/employee.modules.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dtpzfr8oc",
  api_key: 651213427892597,
  api_secret: `027XtjuLEdNQBT0auL8_zBJEgN8`,
});

const createEmployee = async (req, res) => {
  try {
    const { name, role, status } = req.body;
    if (!name || !role || !status) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const uploaded_image = await cloudinary.uploader.upload(req.file.path);

    const user_info = req.user._id;

    const employee = await Employee.create({
      name,
      role,
      status,
      photo: uploaded_image?.secure_url,
      createdBy: user_info,
    });

    if (!employee) {
      return res.status(409).json({
        success: false,
        message: "Error while creating employee",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      createdEmployee: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, status } = req.body;
    const response = await Employee.findByIdAndUpdate(
      id,
      {
        $set: { name, role, status },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const id = req.user._id;
    const response = await Employee.find({ createdBy: id });
    return res.status(200).json({
      success: true,
      message: "Employees fetched",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSpecificEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Employee.findById(id);
    return res.status(200).json({
      success: true,
      message: "Employee get successfully",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getAllEmployee,
  getSpecificEmployee,
};
