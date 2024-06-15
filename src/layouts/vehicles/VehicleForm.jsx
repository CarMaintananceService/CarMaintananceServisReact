import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Popup, Animation, Position, ToolbarItem } from "devextreme-react/popup";
import { RadioGroup } from "devextreme-react/radio-group";
import { ValidationGroup } from "devextreme-react/validation-group";
import { Validator, CustomRule, RequiredRule } from "devextreme-react/validator";
import TextArea from "devextreme-react/text-area";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import "devextreme/dist/css/dx.light.css";
import TextBox, { TextBoxTypes } from "devextreme-react/text-box";

const VehicleForm = ({ isVisible, setIsVisible, transactionData }) => {
  const [formData, setFormData] = useState({
    LicensePlateNo: "",
    Model: "",
    ModelYear: 0,
    Engine: "",
  });

  const [dsTransactionState, setDsTransactionState] = useState(null);
  const [dsTransactionAction, setDsTransactionAction] = useState(null);
  const [dsTransactionComment, setDsTransactionComment] = useState(null);

  const fraudStateValidationGroup = useRef(null);
  const actionValidationGroup = useRef(null);
  const commentValidationGroup = useRef(null);

  useEffect(() => {
    createDxDataSources();
  }, [formData.transactionState]);

  const createDxDataSources = () => {
    const transactionStateStore = new CustomStore({
      key: "transactionStatesId",
      load: () =>
        fetch("api/transaction-states")
          .then((response) => response.json())
          .then((data) => data.filter((d) => d.isDisplayOnClient)),
    });

    const transactionActionStore = new CustomStore({
      key: "transactionActionsId",
      load: () => {
        if (!formData.transactionState) return [];
        return fetch(`api/transaction-state/${formData.transactionState}/actions`)
          .then((response) => response.json())
          .then((data) => data.filter((d) => d.isActive));
      },
    });

    const transactionCommentStore = new CustomStore({
      key: "transactionCommentsId",
      load: () => {
        if (!formData.transactionState) return [];
        return fetch(`api/transaction-state/${formData.transactionState}/comments`)
          .then((response) => response.json())
          .then((data) => data.filter((d) => d.isActive));
      },
    });

    setDsTransactionState(transactionStateStore);
    setDsTransactionAction(transactionActionStore);
    setDsTransactionComment(transactionCommentStore);
  };

  const validateCallback__fraudState = () => formData.transactionState !== null;
  const validateCallback__transactionAction = () =>
    !getLen__actions() || formData.transactionActionsId !== null;
  const validateCallback__comment = () =>
    formData.transactionCommentsId > 0 || formData.agentComment.length > 0;

  const onValueChanged__rdoFraudState = (e) => {
    setFormData({
      ...formData,
      transactionState: e.value,
      transactionActionsId: null,
      transactionCommentsId: null,
    });
  };

  const completeTransaction = () => {
    debugger;
    console.log(formData);
    if (!fraudStateValidationGroup.current.instance.validate().isValid) {
      notify("Lütfen fraud durumunu seçiniz !", "warning", 2500);
      return;
    }
    // Gönderilecek veriyi burada hazırlayın ve API'ye gönderin
    // fetch('api/transaction-result/complete', { method: 'POST', body: JSON.stringify(formData) }); //TODO

    setIsVisible(false);
  };
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const getLen__actions = () => (dsTransactionAction ? dsTransactionAction.totalCount() : 0);
  const getLen__comments = () => (dsTransactionComment ? dsTransactionComment.totalCount() : 0);

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
          <ValidationGroup ref={fraudStateValidationGroup}>
            <TextBox
              onValueChanged={(e) => handleInputChange("LicensePlateNo", e.value)}
              value={formData.LicensePlateNo}
              labelMode="floating"
              label="PlakaNo"
              //TODO: MIN LENGTH
              maxLength="250"
            >
              <Validator>
                <RequiredRule message="Zorunlu alan!" />
              </Validator>
            </TextBox>
            <TextBox
              onValueChanged={(e) => handleInputChange("Model", e.value)}
              value={formData.Model}
              labelMode="floating"
              label="Model"
              //TODO: MIN LENGTH
              maxLength="250"
            >
              <Validator>
                <RequiredRule message="Zorunlu alan!" />
              </Validator>
            </TextBox>
          </ValidationGroup>

          {/* <ValidationGroup ref={actionValidationGroup}>
            <fieldset>
              <legend>
                {getLen__actions() > 0 && (
                  <>
                    Alınacak Aksiyonlar
                    <div style={{ height: "5px", borderBottom: "1px solid #5486ff" }}></div>
                  </>
                )}
              </legend>
              <RadioGroup
                dataSource={dsTransactionAction}
                value={formData.transactionActionsId}
                onValueChanged={(e) => setFormData({ ...formData, transactionActionsId: e.value })}
                displayExpr="description"
                valueExpr="transactionActionsId"
              >
                <Validator>
                  <CustomRule
                    message="Lütfen bir aksiyon seçiniz!"
                    validationCallback={validateCallback__transactionAction}
                    reevaluate={true}
                  />
                </Validator>
              </RadioGroup>
            </fieldset>
          </ValidationGroup>

          <ValidationGroup ref={commentValidationGroup}>
            <fieldset>
              <legend>
                {getLen__comments() > 0 && (
                  <>
                    Belirlenmiş Yorumlar
                    <div style={{ height: "5px", borderBottom: "1px solid #5486ff" }}></div>
                  </>
                )}
              </legend>
              <RadioGroup
                dataSource={dsTransactionComment}
                value={formData.transactionCommentsId}
                onValueChanged={(e) => setFormData({ ...formData, transactionCommentsId: e.value })}
                displayExpr="description"
                valueExpr="transactionCommentsId"
              >
                <Validator>
                  <CustomRule
                    message="Lütfen bir yorum seçiniz veya özel bir yorum giriniz!"
                    validationCallback={validateCallback__comment}
                    reevaluate={true}
                  />
                </Validator>
              </RadioGroup>
            </fieldset>

            <div style={{ marginTop: "15px", height: "45px" }} className="dxcontainer">
              <TextArea
                height="100%"
                maxLength={250}
                placeholder="Özel yorumlarınızı yazabilirsiniz.."
                label="Özel yorumunuz"
                labelMode="floating"
                value={formData.agentComment}
                onValueChanged={(e) => setFormData({ ...formData, agentComment: e.value })}
              />
            </div>
          </ValidationGroup> */}
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
          onClick: completeTransaction,
        }}
      />
    </Popup>
  );
};

// Define prop types for the component
VehicleForm.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  transactionData: PropTypes.object.isRequired,
};

export default VehicleForm;
