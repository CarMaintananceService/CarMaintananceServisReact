import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import notify from "devextreme/ui/notify";
import DataGrid, {
  Column,
  FilterRow,
  Scrolling,
  Editing,
  Paging,
  Sorting,
  Selection,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { prepareFilterBody } from "shared/dxHelpers";
import useAxios from "../../service/useAxios";

const Units = () => {
  const gridRef = useRef(null);
  const { axiosInstance } = useAxios(); // Destructure axiosInstance from the custom hook

  const mainDataSource = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      try {
        return axiosInstance
          .post("/Unit/Filter", prepareFilterBody(loadOptions))
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
      return axiosInstance
        .post("/Unit/insertOrUpdate", values)
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
          .find((i) => i.Id === key),
        ...values,
      };
      return axiosInstance
        .post("/Unit/insertOrUpdate", post_values)
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
      return axiosInstance
        .delete(`/Unit/Delete?id=${key}`)
        .then((res) => {
          res = res.data;
          if (res.Success) notify("Silme işlemi tamamlandı", "success", 1500);
          else throw res.Error;
        })
        .catch((error) => {
          console.error(`Units/Delete/${key}/delete : `, error);
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
            allowAdding={true}
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
