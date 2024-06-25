// components/Navigation.js
import React from "react";
import TreeView from "devextreme-react/tree-view";
import { useNavigate } from "react-router-dom";
import "./n.css";

const navItems = [
  {
    id: "1",
    text: "Dashboard",
    icon: "home",
    path: "/dashboard",
  },
  {
    id: "2",
    text: "Araç tanımları",
    icon: "car",
    path: "/vehicles",
    items: [
      { id: "2_1", text: "Araç tipleri", path: "/vehicleType" },
      { id: "2_2", text: "Araç markaları", path: "/vehicleBrand" },
      { id: "2_3", text: "Kasa tiplri", path: "/caseType" },
    ],
  },
  {
    id: "3",
    text: "Stok kartları",
    icon: "folder",
    path: "/stockCards",
    items: [
      { id: "3_1", text: "Birimler", path: "/stockCardUnit" },
      { id: "3_2", text: "Markalar", path: "/stockCardBrand" },
      { id: "3_3", text: "Hareketler", path: "/stockMovements" },
    ],
  },
  {
    id: "4",
    text: "Tamir Hareketleri",
    icon: "folder",
    path: "/repairActivity",
  },
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
  {
    id: "10",
    text: "Sign In",
    icon: "folder",
    path: "/login",
  },
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
      items={navItems}
      dataStructure="tree"
      keyExpr="id"
      displayExpr="text"
      parentIdExpr="parentId"
      onItemClick={onItemClick}
    />
  );
};

export default Navigations;
