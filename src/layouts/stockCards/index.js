import React, { useEffect, useState } from "react";
import "./style.css";
import { DataGrid, Editing, Column, ValidationRule, Button } from "devextreme-react/data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useAxios from "../../service/useAxios";

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
  const { axiosWithToken } = useAxios();

  const fetchEmployees = async () => {
    try {
      const response = await axiosWithToken.post("/StockCard/Search");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async (newData) => {
    try {
      const response = await axiosWithToken.post("/api/employees", newData);
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleUpdateEmployee = async (key, updatedData) => {
    try {
      await axiosWithToken.put(`/api/employees/${key}`, updatedData);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (key) => {
    try {
      await axiosWithToken.delete(`/api/employees/${key}`);
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
          <Column dataField="ProductGroupId" caption="ProductGroupId">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="NameOfThePurchasingCompanyId" caption="NameOfThePurchasingCompanyId">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="StockCardBrandId" caption="StockCardBrandId">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="StockCardUnitId" caption="StockCardUnitId">
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
