import React, { useState, useEffect, useRef } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import { Popup, Animation, Position, ToolbarItem } from "devextreme-react/popup";
import { ValidationGroup } from "devextreme-react/validation-group";
import { Validator, CustomRule, RequiredRule } from "devextreme-react/validator";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import { RadioGroup } from "devextreme-react/radio-group";
import TextArea from "devextreme-react/text-area";
import TextBox, { TextBoxTypes } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import { DateBox } from "devextreme-react/date-box";
import { NumberBox } from "devextreme-react/number-box";
import { prepareFilterBody, searchRequestLoad } from "shared/dxHelpers";
import useAxios from "../../service/useAxios";

const RepairActivityForm = ({ isVisible, setIsVisible, transactionData, settransactionData }) => {
  const { axiosInstance } = useAxios();

  const [formData, setFormData] = useState({
    AcceptanceDateOfTheVehicle: null,
    ServiceEntryKm: null,
    PersonWhoBroughtTheVehicle: null,
    VehicleMalfunctionDescription: null,
    PersonnelReceivingTheVehicle: null,
    VehicleMalfunctionDescription: null,
    PersonnelReceivingTheVehicle: null,
    PlannedEndDate: null,
    ChangingPart: null,
    ChangedPartPhoto: null,
    AmountOfChangedParts: null,
    AmountOfOutsourcedLabor: null,
    Status: null,
    Description: null,
  });

  const mainValidationGroup = useRef(null);

  useEffect(() => {
    setFormData(transactionData);
    console.log("transactionData : ", transactionData);
  }, [formData.transactionState]);

  // TODO: CHECK FOR STATUS AS ENUM
  //   const dsVehicleBrand = new CustomStore({
  //     loadMode: "raw",
  //     key: "Id",
  //     load: (loadOptions) => {
  //       return searchRequestLoad("VehicleBrand/Search", loadOptions, axiosInstance);
  //     },
  //   });
  //   const dsVehicleType = new CustomStore({
  //     loadMode: "raw",
  //     key: "Id",
  //     load: (loadOptions) => {
  //       return searchRequestLoad("VehicleType/Search", loadOptions, axiosInstance);
  //     },
  //   });
  //   const dsCaseType = new CustomStore({
  //     loadMode: "raw",
  //     key: "Id",
  //     load: (loadOptions) => {
  //       return searchRequestLoad("CaseType/Search", loadOptions, axiosInstance);
  //     },
  //   });
  //   const dsFuelType = [
  //     { Id: 1, Name: "Benzin" },
  //     { Id: 2, Name: "Mazot" },
  //     { Id: 3, Name: "Gaz" },
  //   ];

  const saveForm = () => {
    if (!mainValidationGroup.current.instance.validate().isValid) {
      notify("Lütfen zorunlu alanları doldurunuz !", "warning", 2500);
      return;
    }

    axiosInstance
      .post("/RepairActivity/InsertOrUpdate", formData)
      .then((response) => {
        const res = response.data;
        if (res.Success) {
          setIsVisible(false);
          settransactionData(null);
        } else {
          notify(res.Error, "error", 3500);
        }
      })
      .catch((error) => {
        console.error("Data loading error", error);
        notify(JSON.stringify(error), "error", 3500);
      });
  };
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Popup
      visible={isVisible}
      showTitle={false}
      dragEnabled={false}
      showCloseButton={true}
      onHiding={() => setIsVisible(false)}
      width={700}
      height={700}
    >
      <Animation
        hide={{ type: "slideOut", direction: "right", duration: 250 }}
        show={{ type: "slideIn", direction: "right", duration: 250 }}
      />
      <Position at="right" my="right" collision="fit" boundaryOffset="-250 0" />

      <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ height: "calc(100% - 100px)", padding: "10px" }}>
          <ValidationGroup ref={mainValidationGroup}>
            {/*  NO NEED
            <div className="control">
              <SelectBox
                onValueChanged={(e) => handleInputChange("VehicleBrandId", e.value)}
                value={formData.VehicleBrandId}
                dataSource={dsVehicleBrand}
                displayExpr="Name"
                valueExpr="Id"
                labelMode="floating"
                label="Araç Markası"
                searchEnabled={true}
                showClearButton={true}
              >
                <Validator>
                  <RequiredRule message="?" />
                </Validator>
              </SelectBox>
            </div>
            <SelectBox
              onValueChanged={(e) => handleInputChange("VehicleTypeId", e.value)}
              value={formData.VehicleTypeId}
              dataSource={dsVehicleType}
              displayExpr="Name"
              valueExpr="Id"
              labelMode="floating"
              label="Araç Tipi"
              searchEnabled={true}
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </SelectBox>
            <SelectBox
              onValueChanged={(e) => handleInputChange("CaseTypeId", e.value)}
              value={formData.CaseTypeId}
              dataSource={dsCaseType}
              displayExpr="Name"
              valueExpr="Id"
              labelMode="floating"
              label="Kasa Tipi"
              searchEnabled={true}
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </SelectBox> */}
            <DateBox
              onValueChanged={(e) => handleInputChange("AcceptanceDateOfTheVehicle", e.value)}
              value={formData.AcceptanceDateOfTheVehicle}
              labelMode="floating"
              label="Aracın Kabul Tarihi"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <TextBox
              onValueChanged={(e) => handleInputChange("ServiceEntryKm", e.value)}
              value={formData.ServiceEntryKm}
              labelMode="floating"
              label="Servise Giriş Km"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("PersonWhoBroughtTheVehicle", e.value)}
              value={formData.PersonWhoBroughtTheVehicle}
              labelMode="floating"
              label="Aracı Getiren Kişi"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("VehicleMalfunctionDescription", e.value)}
              value={formData.VehicleMalfunctionDescription}
              labelMode="floating"
              label="Araç Arıza Açıklaması"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <TextBox
              onValueChanged={(e) => handleInputChange("PersonnelReceivingTheVehicle", e.value)}
              value={formData.PersonnelReceivingTheVehicle}
              labelMode="floating"
              label="Aracı Teslim Alan Personel"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("PlannedEndDate", e.value)}
              value={formData.PlannedEndDate}
              labelMode="floating"
              label="Planlanan Bitiş Tarihi"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <TextBox
              onValueChanged={(e) => handleInputChange("ChangingPart", e.value)}
              value={formData.ChangingPart}
              labelMode="floating"
              label="Değişen Parça"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("ChangedPartPhoto", e.value)}
              value={formData.ChangedPartPhoto}
              labelMode="floating"
              label="Değiştirilen Parça Fotoğrafı"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("AmountOfChangedParts", e.value)}
              value={formData.AmountOfChangedParts}
              labelMode="floating"
              label="Değişen Parça Miktarı"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("AmountOfOutsourcedLabor", e.value)}
              value={formData.AmountOfOutsourcedLabor}
              labelMode="floating"
              label="Dış Kaynaklı İşgücü Miktarı"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("Status", e.value)}
              value={formData.Status}
              labelMode="floating"
              label="Durum"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("Description", e.value)}
              value={formData.Description}
              labelMode="floating"
              label="Açıklama"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
          </ValidationGroup>
        </div>
      </div>

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="before"
        options={{
          text: "Kapat",
          stylingMode: "text",
          type: "danger",
          icon: "close",
          onClick: () => {
            setIsVisible(false);
            settransactionData(null);
          },
        }}
      />

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="before"
        options={{
          text: "Kaydet",
          stylingMode: "text",
          type: "success",
          icon: "save",
          onClick: saveForm,
        }}
      />
    </Popup>
  );
};

RepairActivityForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  transactionData: PropTypes.object.isRequired,
  settransactionData: PropTypes.func.isRequired,
};

export default RepairActivityForm;
