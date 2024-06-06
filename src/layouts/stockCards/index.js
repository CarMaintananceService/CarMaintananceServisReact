import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { DataGrid, Editing, Column, ValidationRule, Button } from "devextreme-react/data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

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

const StockCards = () => {
  const [employees, setEmployees] = useState([]);

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
            mode="form"
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
            <Button name="edit" />
            <Button name="delete" />
          </Column>
        </DataGrid>
      </DashboardLayout>
    </div>
  );
};

export default StockCards;
