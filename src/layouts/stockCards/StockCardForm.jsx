import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Popup, Animation, Position, ToolbarItem } from "devextreme-react/popup";
import { ValidationGroup } from "devextreme-react/validation-group";
import { Validator, CustomRule, RequiredRule } from "devextreme-react/validator";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import "devextreme/dist/css/dx.light.css";
import { RadioGroup } from "devextreme-react/radio-group";
import TextArea from "devextreme-react/text-area";
import TextBox, { TextBoxTypes } from "devextreme-react/text-box";
import SelectBox from "devextreme-react/select-box";
import { DateBox } from "devextreme-react/date-box";
import { prepareFilterBody, searchRequestLoad } from "shared/dxHelpers";
import useAxios from "../../service/useAxios";

const StockCardForm = ({ isVisible, setIsVisible, transactionData }) => {
  const { axiosInstance } = useAxios();

  const [formData, setFormData] = useState({
    ProductGroupId: null,
    NameOfThePurchasingCompanyId: null,
    StockCardBrandId: null,
    StockCardUnitId: null,
    StockCode: null,
    ProductCode: null,
    Unit: null,
    SpecialCode: null,
    ManufacturerCode: null,
    ShelfNumber: null,
    BoxNumber: null,
    PurchasePrice: null,
    InvoiceNo: null,
    Quantity: null,
    PacanianPhoto: null,
    Description: null,
  });

  const mainValidationGroup = useRef(null);

  useEffect(() => {
    setFormData(transactionData);
  }, [formData.transactionState]);

  const dsProductGroup = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("ProductGroup/Search", loadOptions, axiosInstance);
    },
  });

  const dsNameOfThePurchasingCompany = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("NameOfThePurchasingCompany/Search", loadOptions, axiosInstance);
    },
  });
  const dsStockCardUnit = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("StockCardUnit/Search", loadOptions, axiosInstance);
    },
  });
  const dsStockCardBrand = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("StockCardBrand/Search", loadOptions, axiosInstance);
    },
  });

  const saveForm = () => {
    if (!mainValidationGroup.current.instance.validate().isValid) {
      notify("Lütfen zorunlu alanları doldurunuz !", "warning", 2500);
      return;
    }

    axiosInstance
      .post("/StockCard/InsertOrUpdate", formData)
      .then((response) => {
        const res = response.data;
        if (res.Success) {
          setIsVisible(false);
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
            <SelectBox
              onValueChanged={(e) => handleInputChange("ProductGroupId", e.value)}
              value={formData.ProductGroupId}
              dataSource={dsProductGroup}
              displayExpr="Name"
              valueExpr="Id"
              labelMode="floating"
              label="ProductGroup"
              searchEnabled={true}
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </SelectBox>
            <SelectBox
              onValueChanged={(e) => handleInputChange("NameOfThePurchasingCompanyId", e.value)}
              value={formData.NameOfThePurchasingCompanyId}
              dataSource={dsNameOfThePurchasingCompany}
              displayExpr="Name"
              valueExpr="Id"
              labelMode="floating"
              label="NameOfThePurchasingCompanyId"
              searchEnabled={true}
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </SelectBox>
            <SelectBox
              onValueChanged={(e) => handleInputChange("StockCardUnitId", e.value)}
              value={formData.StockCardUnitId}
              dataSource={dsStockCardUnit}
              displayExpr="Name"
              valueExpr="Id"
              labelMode="floating"
              label="StockCardUnitId"
              searchEnabled={true}
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </SelectBox>
            <SelectBox
              onValueChanged={(e) => handleInputChange("StockCardBrandId", e.value)}
              value={formData.StockCardBrandId}
              dataSource={dsStockCardBrand}
              displayExpr="Name"
              valueExpr="Id"
              labelMode="floating"
              label="StockCardBrandId"
              searchEnabled={true}
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </SelectBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("StockCode", e.value)}
              value={formData.StockCode}
              labelMode="floating"
              label="StockCode"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("ProductCode", e.value)}
              value={formData.ProductCode}
              labelMode="floating"
              label="ProductCode"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("Unit", e.value)}
              value={formData.Unit}
              labelMode="floating"
              label="Unit"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            />
            {/*<TextBox
              onValueChanged={(e) => handleInputChange("Engine", e.value)}
              value={formData.Engine}
              labelMode="floating"
              label="Makine"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
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
                <RequiredRule message="" />
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
                <RequiredRule message="" />
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
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("ColorKeyCode", e.value)}
              value={formData.ColorKeyCode}
              labelMode="floating"
              label="ColorKeyCode"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("RadioCode", e.value)}
              value={formData.RadioCode}
              labelMode="floating"
              label="RadioCode"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("DateOfRegistration", e.value)}
              value={formData.DateOfRegistration}
              labelMode="floating"
              label="DateOfRegistration Yılı"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("ReleaseDate", e.value)}
              value={formData.ReleaseDate}
              labelMode="floating"
              label="ReleaseDate"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <TextBox
              onValueChanged={(e) => handleInputChange("EngineDisplacementPowerKW", e.value)}
              value={formData.EngineDisplacementPowerKW}
              labelMode="floating"
              label="EngineDisplacementPowerKW"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <TextBox
              //TODO: check for if it suits
              onValueChanged={(e) => handleInputChange("FuelTypeId", e.value)}
              value={formData.FuelTypeId}
              labelMode="floating"
              label="FuelTypeId"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("NetWeight", e.value)}
              value={formData.NetWeight}
              labelMode="floating"
              label="NetWeight"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <DateBox
              onValueChanged={(e) => handleInputChange("WarrantyEndDate", e.value)}
              value={formData.WarrantyEndDate}
              labelMode="floating"
              label="WarrantyEndDate"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("DateOfLastMedicalInspection", e.value)}
              value={formData.DateOfLastMedicalInspection}
              labelMode="floating"
              label="DateOfLastMedicalInspection"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("FenniMuayeneEndDate", e.value)}
              value={formData.FenniMuayeneEndDate}
              labelMode="floating"
              label="FenniMuayeneEndDate"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
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
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("TrafficInsuranceEndDate", e.value)}
              value={formData.TrafficInsuranceEndDate}
              labelMode="floating"
              label="TrafficInsuranceEndDate"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("InsuranceStartDate", e.value)}
              value={formData.InsuranceStartDate}
              labelMode="floating"
              label="InsuranceStartDate"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <DateBox
              onValueChanged={(e) => handleInputChange("InsuranceEndDate", e.value)}
              value={formData.InsuranceEndDate}
              labelMode="floating"
              label="InsuranceEndDate"
              type="date"
              displayFormat="dd-MM-yyyy"
              serializationFormat="yyyy-MM-ddTHH:mm:ssZ"
              showClearButton={true}
            />
            <TextBox
              onValueChanged={(e) => handleInputChange("UnitUsingTheTool", e.value)}
              value={formData.UnitUsingTheTool}
              labelMode="floating"
              label="UnitUsingTheTool"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("PhotoOfTheVehicle", e.value)}
              value={formData.PhotoOfTheVehicle}
              labelMode="floating"
              label="PhotoOfTheVehicle"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("Description", e.value)}
              value={formData.Description}
              labelMode="floating"
              label="Description"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
              </Validator>
            </TextBox> */}
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
          onClick: () => setIsVisible(false),
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

StockCardForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  transactionData: PropTypes.object.isRequired,
};

export default StockCardForm;
