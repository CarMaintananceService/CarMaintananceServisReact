import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
//import { DataGrid, Editing, Column, ValidationRule, Button } from "devextreme-react/data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import notify from "devextreme/ui/notify";
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  Scrolling,
  Editing,
  ValidationRule,
  Button,
  Paging,
  Sorting,
  Selection,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { prepareFilterBody } from "shared/dxHelpers";

const Units = () => {
  const gridRef = useRef(null);

  const mainDataSource = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      try {
        return axios
          .post("https://localhost:44380/Unit/Filter", prepareFilterBody(loadOptions))
          .then((response) => {
            const res = response.data;
            if (res.Success) {
              return {
                data: res.Items,
                totalCount: res.TotalCount,
              };
            } else {
              throw new Error(res.Error);
            }
          })
          .catch((error) => {
            console.error("Data loading error", error);
            throw error;
          });
      } catch (error) {
        console.error("Units/Filter:", error);
      }
    },
    insert: (values) => {
      return axios
        .post(`https://localhost:44380/Unit/insertOrUpdate`, values)
        .then((res) => {
          res = res.data;
          if (res.Success) notify("Yeni kayıt işlemi tamamlandı", "success", 1500);
          else throw res.Error;
        })
        .catch((error) => {
          console.error("Units/insertOrUpdate : " + error);
          throw "Hatalı işlem!";
        });
    },
    update: (key, values) => {
      let post_values = {
        ...gridRef.current.instance
          .getDataSource()
          .items()
          .find((i) => i.Id == key),
        ...values,
      };
      return axios
        .post(`https://localhost:44380/Unit/insertOrUpdate`, post_values)
        .then((res) => {
          res = res.data;
          if (res.Success) notify("Güncelleme işlemi tamamlandı", "success", 1500);
          else throw res.Error;
        })
        .catch((error) => {
          console.error("Units/insertOrUpdate : " + error);
          throw "Hatalı işlem!";
        });
    },
    remove: (key) => {
      return axios
        .get(`https://localhost:44380/Unit/Delete/${key}`)
        .then((res) => {
          res = res.data;
          if (res.Success) notify("Silme işlemi tamamlandı", "success", 1500);
          else throw res.Error;
        })
        .catch((error) => {
          console.error(`Units/Delete/${key}/delete : ` + error);
          throw "Hatalı işlem!";
        });
    },
  });

  useEffect(() => {
    if (gridRef.current) {
      console.log(gridRef.current.instance);
    }
  }, []);

  return (
    <div id="data-grid-demo">
      <DashboardLayout>
        <DashboardNavbar />
        <DataGrid
          ref={gridRef}
          dataSource={mainDataSource}
          wordWrapEnabled={true}
          remoteOperations={true}
          repaintChangesOnly={true}
          showBorders={false}
          showColumnLines={false}
          showRowLines={true}
          height="100%"
          width="100%"
          hoverStateEnabled={false}
          cacheEnabled={false}
          syncLookupFilterValues={false}
          selectedRowKeys={[]}
        >
          <Scrolling scrollByContent={true} scrollByThumb={true} preloadEnabled={true} />
          <Sorting mode="single" />
          <Editing
            mode="row"
            allowDeleting={true}
            useIcons={true}
            newRowPosition="pageBottom"
            allowUpdating={true}
            allowAdding={false}
          />
          <Selection mode="single" />
          <FilterRow visible={true} />
          <Paging pageSize={20} />
          <Column dataField="Name" caption="Name">
            <Editing
              validationRules={[
                { type: "required", message: "?" },
                { type: "stringLength", max: 250, message: "Maksimum 250 karakter" },
              ]}
            />
          </Column>
        </DataGrid>
      </DashboardLayout>
    </div>
  );
};

export default Units;
