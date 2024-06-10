import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
//import { DataGrid, Editing, Column, ValidationRule, Button } from "devextreme-react/data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  Scrolling,
  Editing,
  ValidationRule,
  Button,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";

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

const Units = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/StockCardUnit/Filter");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async (newData) => {
    try {
      const response = await axios.post("/StockCardUnit/Filter", newData);
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleUpdateEmployee = async (key, updatedData) => {
    try {
      await axios.put(`/StockCardUnit/Filter/${key}`, updatedData);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (key) => {
    try {
      await axios.delete(`/StockCardUnit/Filter/${key}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const dataSource = new CustomStore({
    load: async (loadOptions) => {
      try {
        console.warn(loadOptions);
        const response = await axios.post("/StockCardUnit/Filter", loadOptions);
        return {
          data: res.Items || [],
          totalCount: res.TotalCount || 0,
        };
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
  });

  //   this.mainDataSource = new CustomStore({
  //     key: 'FootPrintId',
  //     load: (loadOptions: any) => {

  //       that.mainDatagrid.instance.clearSelection();
  //       if (this.dateRange.length < 2) {
  //         return Promise.reject("Başlangıç ve bitiş tarihleri girmelisiniz!");
  //       }

  //       let filterFormData: any = {
  //         beginDate: this.dateRange[0],
  //         endDate: this.dateRange[1],
  //       }

  //       let body = that.prepareFilterBody(loadOptions, filterFormData);
  //       return that.httpList(api/footprints, body);
  //     },
  //     }); //TODO : İNSERT UPDATE VS ALSO

  // this.mainDataSource = new CustomStore({
  //   key: 'FraudTypesId',
  //   load: (loadOptions: any) => {

  //     loadOptions.key = 'Name';
  //     let body = that.prepareFilterBody(loadOptions, null);

  //     return that.httpList(api/fraud-types, body);
  //   },
  //   insert: (values) => {

  //     return that.httpPost(api/fraud-type/insertOrUpdate, values)
  //       .then((res: any) => {

  //         if (!res.HasError)
  //           notify("Yeni kayıt işlemi tamamlandı", "success", 1500);
  //       })
  //       .catch(error => {
  //         console.log("api/fraud-type/insertOrUpdate : " + error);
  //         throw "Hatalı işlem!"
  //       });
  //   },
  //   update: (key, values) => {

  //     let post_values = { ...that.mainDatagrid.instance.getDataSource().items().find(i => i.FraudTypesId == key), ...values };
  //     return that.httpPost(api/fraud-type/insertOrUpdate, post_values)
  //       .then((res: any) => {

  //         if (!res.HasError)
  //           notify("Güncelleme işlemi tamamlandı", "success", 1500);
  //       })
  //       .catch(error => {
  //         console.log("api/fraud-type/insertOrUpdate : " + error);
  //         throw "Hatalı işlem!"
  //       });
  //   },
  //   remove: (key) => {

  //     return that.httpDelete(api/fraud-type/${key}/delete)
  //       .then((res: any) => {

  //         if (!res.HasError)
  //           notify("Silme işlemi tamamlandı", "success", 1500);
  //       })
  //       .catch(error => {
  //         console.log(`api/fraud-type/${key}/delete : ` + error);
  //         throw "Hatalı işlem!"
  //       });
  //       }
  //     });

  // httpList(url: string, body: any) {

  //   let that = this;

  //   if(this.hasGlobalLoading)
  //     this._loadPanelService.showLoader();

  //   return lastValueFrom(this.http.post<any>(${this._appConfigService.inapiUrl}/${url}, body))
  //     .then((res: any) => {

  //       if (res.Success || res.success)
  //        return Promise.resolve({
  //           data: res.Items || res.items || [],
  //           totalCount: res.TotalCount || res.totalCount || 0,
  //         });
  //       else
  //         Promise.reject(res.Error || res.error || "Sunucu hatası!")
  //     })
  //     .finally(() => {

  //       if(this.hasGlobalLoading)
  //         this._loadPanelService.hideLoader();
  //
  //       });
  //   }

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

          <FilterRow visible={true} />
          <FilterPanel visible={true} />
          <HeaderFilter visible={true} />
          <Scrolling mode="infinite" />

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

export default Units;
