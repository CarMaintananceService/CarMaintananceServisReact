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
  Paging,
  Sorting,
  Selection,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";

const Units = () => {
  const prepareFilterBody = (loadOptions, extraData, keys) => {
    let paging = {
      skip: loadOptions.skip,
      take: loadOptions.take,
      sort: prepareSort(loadOptions, keys),
      filter: loadOptions.filter ? JSON.stringify(loadOptions.filter) : null,
      isLoadingAll: loadOptions.isLoadingAll,
    };

    if (loadOptions?.group?.length > 0) paging.dataField = loadOptions.group[0].selector;
    else paging.dataField = loadOptions.dataField;

    paging.requireTotalCount = loadOptions.requireTotalCount;
    paging.userData = extraData;

    return paging;
  };

  const prepareSort = (loadOptions) => {
    let sorts = [];

    if (loadOptions.sort) {
      loadOptions.sort.forEach((sortDt) => {
        sorts.push({
          Desc: sortDt.desc ?? false,
          Selector: sortDt.selector,
        });
      });
    } else {
      sorts.push({
        Desc: false,
        Selector: "Id",
      });
    }
    return sorts;
  };

  const mainDataSource = new CustomStore({
    load: (loadOptions) => {
      try {
        return fetch("https://localhost:44380/Unit/Filter", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prepareFilterBody(loadOptions)),
        })
          .then((response) => response.json())
          .then((data) => {
            return {
              data: data.Items,
              totalCount: data.TotalCount,
            };
          })
          .catch((error) => {
            console.error("Data loading error", error);
            throw error;
          });

        // return axios
        //   .post("/Unit/Filter", JSON.stringify(prepareFilterBody(loadOptions)))
        //   .then((res) => {
        //     return {
        //       data: res.Items || [],
        //       totalCount: res.TotalCount || 0,
        //     };
        //   });
      } catch (error) {
        console.error("Units/Filter:", error);
      }
    },
  });

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  return (
    <div id="data-grid-demo">
      <DashboardLayout>
        <DashboardNavbar />
        <DataGrid
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
