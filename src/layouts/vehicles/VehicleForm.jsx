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

const VehicleForm = ({ isVisible, setIsVisible, transactionData, settransactionData }) => {
  const { axiosInstance } = useAxios();

  const [formData, setFormData] = useState({
    VehicleBrandId: null,
    VehicleTypeId: null,
    CaseTypeId: null,
    LicensePlateNo: null,
    Model: null,
    ModelYear: null,
    Chassis: null,
    License: null,
    Chance: null,
    ColorKeyCode: null,
    RadioCode: null,
    DateOfRegistration: null,
    ReleaseDate: null,
    EngineDisplacementPowerKW: null,
    FuelTypeId: null,
    NetWeight: null,
    WarrantyEndDate: null,
    DateOfLastMedicalInspection: null,
    FenniMuayeneEndDate: null,
    LastExhaustInspectionDate: null,
    TrafficInsuranceStartDate: null,
    TrafficInsuranceEndDate: null,
    InsuranceStartDate: null,
    InsuranceEndDate: null,
    UnitUsingTheTool: null,
    PhotoOfTheVehicle: null,
    Description: null,
  });

  const mainValidationGroup = useRef(null);

  useEffect(() => {
    setFormData(transactionData);
    console.log("transactionData : ", transactionData);
  }, [formData.transactionState]);

  const dsVehicleBrand = new CustomStore({
    loadMode: "raw",
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("VehicleBrand/Search", loadOptions, axiosInstance);
    },
  });
  const dsVehicleType = new CustomStore({
    loadMode: "raw",
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("VehicleType/Search", loadOptions, axiosInstance);
    },
  });
  const dsCaseType = new CustomStore({
    loadMode: "raw",
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("CaseType/Search", loadOptions, axiosInstance);
    },
  });
  const dsFuelType = [
    { Id: 1, Name: "Benzin" },
    { Id: 2, Name: "Mazot" },
    { Id: 3, Name: "Gaz" },
  ];

  const saveForm = () => {
    if (!mainValidationGroup.current.instance.validate().isValid) {
      notify("Lütfen zorunlu alanları doldurunuz !", "warning", 2500);
      return;
    }

    axiosInstance
      .post("/Vehicle/InsertOrUpdate", formData)
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
            </SelectBox>
            <SelectBox
              onValueChanged={(e) => handleInputChange("FuelType", e.value)}
              value={formData.FuelType}
              items={dsFuelType}
              displayExpr="Name"
              valueExpr="Id"
              labelMode="floating"
              label="Yakıt Tipi"
              searchEnabled={true}
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </SelectBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("LicensePlateNo", e.value)}
              value={formData.LicensePlateNo}
              labelMode="floating"
              label="Plaka No"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("Model", e.value)}
              value={formData.Model}
              labelMode="floating"
              label="Model"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("ModelYear", e.value)}
              value={formData.ModelYear}
              labelMode="floating"
              label="Model Yılı"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <TextBox
              onValueChanged={(e) => handleInputChange("Engine", e.value)}
              value={formData.Engine}
              labelMode="floating"
              label="Makine"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("Chassis", e.value)}
              value={formData.Chassis}
              labelMode="floating"
              label="Şase"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("License", e.value)}
              value={formData.License}
              labelMode="floating"
              label="Lisans"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("Chance", e.value)}
              value={formData.Chance}
              labelMode="floating"
              label="Chance"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("ColorKeyCode", e.value)}
              value={formData.ColorKeyCode}
              labelMode="floating"
              label="Renk anahtar kodu"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("RadioCode", e.value)}
              value={formData.RadioCode}
              labelMode="floating"
              label="Radyo kodu"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("DateOfRegistration", e.value)}
              value={formData.DateOfRegistration}
              labelMode="floating"
              label="Kayıt tarihi"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("ReleaseDate", e.value)}
              value={formData.ReleaseDate}
              labelMode="floating"
              label="Yayın tarihi"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <NumberBox
              onValueChanged={(e) => handleInputChange("EngineDisplacementPowerKW", e.value)}
              value={formData.EngineDisplacementPowerKW}
              labelMode="floating"
              label="Motor deplasman güç KW"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </NumberBox>
            <NumberBox
              onValueChanged={(e) => handleInputChange("NetWeight", e.value)}
              value={formData.NetWeight}
              labelMode="floating"
              label="Net ağırlığı"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </NumberBox>
            <MDBox py={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={1.5}>
                    <div>Önemli tarihler</div>
                    <DateBox
                      onValueChanged={(e) => handleInputChange("WarrantyEndDate", e.value)}
                      value={formData.WarrantyEndDate}
                      labelMode="floating"
                      label="Garanti bitiş tarihi"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    />
                    {/* <DateBox
                      onValueChanged={(e) => handleInputChange("DateOfLastMedicalInspection", e.value)}
                      value={formData.DateOfLastMedicalInspection}
                      labelMode="floating"
                      label="DateOfLastMedicalInspection"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    /> */}
                    <DateBox
                      onValueChanged={(e) => handleInputChange("FenniMuayeneEndDate", e.value)}
                      value={formData.FenniMuayeneEndDate}
                      labelMode="floating"
                      label="Fenni Muayene Bitiş Tarihi"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    />
                    {/* <DateBox
                      onValueChanged={(e) => handleInputChange("LastExhaustInspectionDate", e.value)}
                      value={formData.LastExhaustInspectionDate}
                      labelMode="floating"
                      label="LastExhaustInspectionDate"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    />
                    <DateBox
                      onValueChanged={(e) => handleInputChange("TrafficInsuranceStartDate", e.value)}
                      value={formData.TrafficInsuranceStartDate}
                      labelMode="floating"
                      label="TrafficInsuranceStartDate"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    /> */}
                    <DateBox
                      onValueChanged={(e) => handleInputChange("TrafficInsuranceEndDate", e.value)}
                      value={formData.TrafficInsuranceEndDate}
                      labelMode="floating"
                      label="Trafik Sigorta Bitiş Tarihi"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    />
                    <DateBox
                      onValueChanged={(e) => handleInputChange("InsuranceStartDate", e.value)}
                      value={formData.InsuranceStartDate}
                      labelMode="floating"
                      label="Sigorta Başlangıç Tarihi"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    />
                    <DateBox
                      onValueChanged={(e) => handleInputChange("InsuranceEndDate", e.value)}
                      value={formData.InsuranceEndDate}
                      labelMode="floating"
                      label="Sigorta Bitiş Tarihi"
                      type="date"
                      displayFormat="dd-MM-yyyy"
                      serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                      showClearButton={true}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("UnitUsingTheTool", e.value)}
              value={formData.UnitUsingTheTool}
              labelMode="floating"
              label="Birim Aracı Kullanma"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("PhotoOfTheVehicle", e.value)}
              value={formData.PhotoOfTheVehicle}
              labelMode="floating"
              label="Aracın Fotoğrafı"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("Description", e.value)}
              value={formData.Description}
              labelMode="floating"
              label="Açıklama"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="?" />
              </Validator>
            </TextBox>
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

VehicleForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  transactionData: PropTypes.object.isRequired,
  settransactionData: PropTypes.func.isRequired,
};

export default VehicleForm;
