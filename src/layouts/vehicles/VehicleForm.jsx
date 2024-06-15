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

const VehicleForm = ({ isVisible, setIsVisible, transactionData }) => {
  const { axiosInstance } = useAxios();

  const [formData, setFormData] = useState({
    VehicleBrandId: null,
    VehicleTypeId: null,
    CaseTypeId: null,
    LicensePlateNo: null,
    Model: null,
    ModelYear: null,
    Engine: null,
  });

  const mainValidationGroup = useRef(null);

  useEffect(() => {
    setFormData(transactionData);
  }, [formData.transactionState]);

  const dsVehicleBrand = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("VehicleBrand/Search", loadOptions, axiosInstance);
    },
  });

  const dsVehicleType = new CustomStore({
    key: "Id",
    load: (loadOptions) => {
      return searchRequestLoad("VehicleType/Search", loadOptions, axiosInstance);
    },
  });

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
                <RequiredRule message="" />
              </Validator>
            </SelectBox>
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
                <RequiredRule message="" />
              </Validator>
            </SelectBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("LicensePlateNo", e.value)}
              value={formData.LicensePlateNo}
              labelMode="floating"
              label="PlakaNo"
              minxLength="5"
              maxLength="250"
              showClearButton={true}
            >
              <Validator>
                <RequiredRule message="" />
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
                <RequiredRule message="" />
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

VehicleForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  transactionData: PropTypes.object.isRequired,
};

export default VehicleForm;
