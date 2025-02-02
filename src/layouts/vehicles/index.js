import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Button as DataGridButton,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";

import CustomStore from "devextreme/data/custom_store";
import { prepareFilterBody } from "shared/dxHelpers";
import useAxios from "../../service/useAxios";
import VehicleForm from "./VehicleForm.jsx";

const Vehicles = () => {
  const gridRef = useRef(null);
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Auth state'ten token alın
  const [isVisible, setIsVisible] = useState(false);
  const [transactionData, settransactionData] = useState();
  const onEditting = useCallback((e) => {
    settransactionData(null);
    settransactionData({ ...e.row.data });
    setIsVisible(true);
    // const clonedItem = { ...e.row.data, ID: getMaxID() };
    // setEmployees((prevState) => {
    //   const updatedEmployees = [...prevState];
    //   updatedEmployees.splice(e.row.rowIndex, 0, clonedItem);
    //   return updatedEmployees;
    // });
    e.event.preventDefault();
  }, []);

  useEffect(() => {
    // Eğer token yoksa, login sayfasına yönlendir
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const mainDataSource = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      try {
        return axiosInstance
          .post("/Vehicle/Filter", prepareFilterBody(loadOptions))
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
        console.error("Vehicle/Filter:", error);
      }
    },
    insert: (values) => {
      return axiosInstance
        .post("/Vehicle/InsertOrUpdate", values)
        .then((res) => {
          res = res.data;
          if (res.Success) notify("Yeni kayıt işlemi tamamlandı", "success", 1500);
          else throw res.Error;
        })
        .catch((error) => {
          console.error("Vehicle/InsertOrUpdate : " + error);
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
        .post("/Vehicle/InsertOrUpdate", post_values)
        .then((res) => {
          res = res.data;
          if (res.Success) notify("Güncelleme işlemi tamamlandı", "success", 1500);
          else throw res.Error;
        })
        .catch((error) => {
          console.error("Vehicle/InsertOrUpdate : " + error);
          throw "Hatalı işlem!";
        });
    },
    remove: (key) => {
      return axiosInstance
        .delete(`/Vehicle/Delete?id=${key}`)
        .then((res) => {
          res = res.data;
          if (res.Success) notify("Silme işlemi tamamlandı", "success", 1500);
          else throw res.Error;
        })
        .catch((error) => {
          console.error(`Vehicle/Delete/${key}/delete : `, error);
          throw "Hatalı işlem!";
        });
    },
  });

  useEffect(() => {
    if (gridRef.current) {
      //console.log(gridRef.current.instance);
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
        >
          <Scrolling scrollByContent={true} scrollByThumb={true} preloadEnabled={true} />
          <Sorting mode="single" />
          <Editing
            mode="row"
            allowDeleting={true}
            useIcons={true}
            newRowPosition="pageBottom"
            allowUpdating={false}
            allowAdding={false}
          />
          <Selection mode="single" />
          <FilterRow visible={true} />
          <Paging pageSize={20} />
          <Column
            type="buttons"
            width={110}
            headerCellRender={() => (
              <div className="grid-header-button">
                <Button
                  stylingMode="text"
                  type="default"
                  icon="add"
                  width="100%"
                  onClick={() => {
                    settransactionData({});
                    setIsVisible(true);
                  }}
                />
              </div>
            )}
          >
            <DataGridButton name="delete" hint="Sil" />
            <DataGridButton hint="Güncelle" icon="edit" onClick={onEditting} />
          </Column>
          <Column dataField="LicensePlateNo" caption="LicensePlateNo">
            <Editing
              validationRules={[
                { type: "required", message: "?" },
                {
                  type: "stringLength",
                  max: 250,
                  message: "Maksimum 250 karakter",
                },
              ]}
            />
          </Column>
          <Column dataField="Model" caption="Model">
            <Editing
              validationRules={[
                { type: "required", message: "?" },
                {
                  type: "stringLength",
                  max: 250,
                  message: "Maksimum 250 karakter",
                },
              ]}
            />
          </Column>
          <Column dataField="ModelYear" caption="ModelYear">
            <Editing
              validationRules={[
                { type: "required", message: "?" },
                {
                  type: "stringLength",
                  max: 250,
                  message: "Maksimum 250 karakter",
                },
              ]}
            />
          </Column>
          <Column dataField="Engine" caption="Engine">
            <Editing
              validationRules={[
                { type: "required", message: "?" },
                {
                  type: "stringLength",
                  max: 250,
                  message: "Maksimum 250 karakter",
                },
              ]}
            />
          </Column>
        </DataGrid>
        <>
          {transactionData && (
            <VehicleForm
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              transactionData={transactionData}
              settransactionData={settransactionData}
            />
          )}
        </>
      </DashboardLayout>
    </div>
  );
};

export default Vehicles;
