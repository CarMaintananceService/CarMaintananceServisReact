// components/Navigation.js
import React from "react";
import TreeView from "devextreme-react/tree-view";
import { useNavigate } from "react-router-dom";
import "./n.css";

const items = [
  {
    id: "1",
    text: "Dashboard",
    icon: "home",
    path: "/dashboard",
  },
  {
    id: "2",
    text: "Vehicles",
    icon: "car",
    path: "/vehicles",
    items: [
      { id: "2_1", text: "VehicleType", path: "/vehicleType" },
      { id: "2_2", text: "Vehicle Brands", path: "/vehicleBrand" },
      { id: "2_3", text: "CaseType", path: "/caseType" },
    ],
  },
  {
    id: "3",
    text: "StockCards",
    icon: "folder",
    path: "/stockCards",
    items: [
      { id: "3_1", text: "StockCardUnit", path: "/stockCardUnit" },
      { id: "3_2", text: "StockCardBrands", path: "/stockCardBrand" },
      { id: "3_3", text: "StockMovements", path: "/stockMovements" },
    ],
  },
  // {
  //   id: "4",
  //   text: "StockCards",
  //   icon: "folder",
  //   path: "/stockCards",
  //   items: [
  //     { id: "2_1", text: "StockCardUnit", path: "/stockCardUnit" },
  //     { id: "2_2", text: "StockCardBrands", path: "/stockCardBrand" },
  //     { id: "2_3", text: "StockMovements", path: "/stockMovements" },
  //   ],
  // },
  // {
  //   id: "5",
  //   text: "StockCards",
  //   icon: "folder",
  //   path: "/stockCards",
  //   items: [
  //     { id: "2_1", text: "StockCardUnit", path: "/stockCardUnit" },
  //     { id: "2_2", text: "StockCardBrands", path: "/stockCardBrand" },
  //     { id: "2_3", text: "StockMovements", path: "/stockMovements" },
  //   ],
  // },
  // {
  //   id: "6",
  //   text: "StockCards",
  //   icon: "folder",
  //   path: "/stockCards",
  //   items: [
  //     { id: "2_1", text: "StockCardUnit", path: "/stockCardUnit" },
  //     { id: "2_2", text: "StockCardBrands", path: "/stockCardBrand" },
  //     { id: "2_3", text: "StockMovements", path: "/stockMovements" },
  //   ],
  // },
  // {
  //   id: "7",
  //   text: "StockCards",
  //   icon: "folder",
  //   path: "/stockCards",
  //   items: [
  //     { id: "2_1", text: "StockCardUnit", path: "/stockCardUnit" },
  //     { id: "2_2", text: "StockCardBrands", path: "/stockCardBrand" },
  //     { id: "2_3", text: "StockMovements", path: "/stockMovements" },
  //   ],
  // },
  // {
  //   id: "8",
  //   text: "StockCards",
  //   icon: "folder",
  //   path: "/stockCards",
  //   items: [
  //     { id: "2_1", text: "StockCardUnit", path: "/stockCardUnit" },
  //     { id: "2_2", text: "StockCardBrands", path: "/stockCardBrand" },
  //     { id: "2_3", text: "StockMovements", path: "/stockMovements" },
  //   ],
  // },
  // {
  //   id: "9",
  //   text: "StockCards",
  //   icon: "folder",
  //   path: "/stockCards",
  //   items: [
  //     { id: "2_1", text: "StockCardUnit", path: "/stockCardUnit" },
  //     { id: "2_2", text: "StockCardBrands", path: "/stockCardBrand" },
  //     { id: "2_3", text: "StockMovements", path: "/stockMovements" },
  //   ],
  // },
];

const Navigations = () => {
  const navigate = useNavigate();

  const onItemClick = (e) => {
    if (e.itemData.path) {
      navigate(e.itemData.path);
    }
  };

  return (
    <TreeView
      items={items}
      dataStructure="tree"
      displayExpr="text"
      parentIdExpr="parentId"
      idField="id"
      expandEvent="click"
      onItemClick={onItemClick}
    />
  );
};

export default Navigations;
