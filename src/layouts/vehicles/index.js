import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { DataGrid, Editing, Column, ValidationRule, Button } from "devextreme-react/data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Popup, Position } from "devextreme-react/popup";
import { Form, SimpleItem } from "devextreme-react/form";

const allowDeleting = (e) => e.row.data.ID !== 1;

const onEditorPreparing = (e) => {
  if (e.dataField === "Head_ID" && e.row.data.ID === 1) {
    e.editorOptions.disabled = true;
    e.editorOptions.value = null;
  }
};

const onInitNewRow = (e) => {
  e.data.Head_ID = 1;
};

const Vehicles = () => {
  const [employees, setEmployees] = useState([]);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async (newData) => {
    try {
      const response = await axios.post("/api/employees", newData);
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleUpdateEmployee = async (key, updatedData) => {
    try {
      await axios.put(`/api/employees/${key}`, updatedData);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (key) => {
    try {
      await axios.delete(`/api/employees/${key}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditClick = (data) => {
    setEditData(data);
    setEditPopupVisible(true);
  };

  const handleSaveEdit = async () => {
    if (editData) {
      await handleUpdateEmployee(editData.ID, editData);
      setEditPopupVisible(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div id="data-grid-demo">
      <DashboardLayout>
        <DashboardNavbar />
        <DataGrid
          id="employees"
          dataSource={employees}
          columnAutoWidth={true}
          showRowLines={true}
          showBorders={true}
          keyExpr="ID"
          parentIdExpr="Head_ID"
          onEditorPreparing={onEditorPreparing}
          onInitNewRow={onInitNewRow}
          onRowInserted={(e) => handleAddEmployee(e.data)}
          onRowUpdated={(e) => handleUpdateEmployee(e.key, e.data)}
          onRowRemoved={(e) => handleDeleteEmployee(e.key)}
        >
          <Editing
            allowUpdating={true}
            allowDeleting={allowDeleting}
            allowAdding={true}
            mode="row"
          />
          <Column dataField="Prefix" caption="ProductGroupId">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="Prefix" caption="NameOfThePurchasingCompanyId">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="Prefix" caption="StockCardBrandId">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="Title" caption="StockCardUnitId">
            <ValidationRule type="required" />
          </Column>
          <Column type="buttons">
            <Button name="edit" onClick={(e) => handleEditClick(e.row.data)} />
            <Button name="delete" />
          </Column>
        </DataGrid>

        <Popup
          visible={editPopupVisible}
          onHiding={() => setEditPopupVisible(false)}
          dragEnabled={false}
          closeOnOutsideClick={false}
          showTitle={true}
          title="Edit Employee"
          width={600}
          height={600}
        >
          <Position at="center" my="center" />
          <Form
            formData={editData}
            onFieldDataChanged={(e) => setEditData({ ...editData, [e.dataField]: e.value })}
          >
            <SimpleItem dataField="ProductGroupId" />
            <SimpleItem dataField="NameOfThePurchasingCompanyId" />
            <SimpleItem dataField="StockCardBrandId" />
            <SimpleItem dataField="StockCardUnitId" />
            <SimpleItem dataField="AdditionalField1" />
            <SimpleItem dataField="AdditionalField2" />
            <SimpleItem dataField="AdditionalField3" />
            <SimpleItem dataField="AdditionalField4" />
            <SimpleItem dataField="AdditionalField5" />
            <SimpleItem dataField="AdditionalField6" />
            <SimpleItem dataField="AdditionalField7" />
            <SimpleItem dataField="AdditionalField8" />
            <SimpleItem dataField="AdditionalField9" />
            <SimpleItem dataField="AdditionalField10" />
          </Form>
          <div className="dx-button-group">
            <Button text="Save" type="default" onClick={handleSaveEdit} />
            <Button text="Cancel" onClick={() => setEditPopupVisible(false)} />
          </div>
        </Popup>
      </DashboardLayout>
    </div>
  );
};

export default Vehicles;
