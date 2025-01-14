const setEnv = () => {
  if (import.meta.env.VITE_REACT_APP_ENV == "prod") {
    return import.meta.env.VITE_REACT_APP_API_URL;
  } else if (import.meta.env.VITE_REACT_APP_ENV == "stag") {
    return import.meta.env.VITE_REACT_APP_API_URL;
  } else {
    return import.meta.env.VITE_REACT_APP_API_URL;
  }
};

let env = setEnv();

const baseURL = `${env}`;
const ssoBaseURL = "https://api.corepeelers.com";
const sso = "/sso-service/api/v1";
const AUTH = "/auth";
const USER = "/user";
const ROLE = "/role";
const GROUP = "/group";
const RECONCILIATION_SERVICE = "/subway-service";
const PUBLIC = "/public";
const DASHBOARD = "/dashboard";
const _3PO = "/threepo";
const VOUCHER = "/voucher";
const CUSTOM = "/custom";

const apiEndpoints = {
  // !AUTH --- DO NOT TOUCH
  ACCESS_TOKEN: `${sso}${AUTH}/access/token`,
  REFRESH_TOKEN: `${sso}${AUTH}/refresh/token`,
  USER_LOGOUT: `${sso}${AUTH}/logout`,
  RESET_PASSWORD: `${sso}${USER}/reset/password`,
  CHANGE_PASSWORD: `${sso}${USER}/change/password`,
  PROFILE: `${sso}${USER}/profile`,
  FORGOT_PASSWORD: `${sso}${USER}/forgot/password`,

  //!USER --- DO NOT TOUCH
  USERS_LIST: `${sso}${USER}/list`,
  SPECIFIC_USER_LIST: `${sso}${USER}/username/list`,
  UPDATE_SPECIFIC_USER_LIST: `${sso}${USER}/update`,
  CREATE_USER: `${sso}${USER}/create`,
  SPECIFIC_USER_DETAILS: "user", // 'user/12,
  USER_AUTHORITY: `${sso}${USER}/authority`,

  //!ROLE --- DO NOT TOUCH
  ROLES_LIST: `${sso}${ROLE}/list`,
  DELETE_ROLE_LIST: `${sso}${ROLE}/delete`,
  UPDATE_SPECIFIC_ROLE_LIST: `${sso}${ROLE}/update`,
  CREATE_ROLE: `${sso}${ROLE}/create`,
  SPECIFIC_ROLE_DETAILS: "role", // 'user/12

  //!GROUP --- DO NOT TOUCH
  GROUPS_LIST: `${sso}${GROUP}/list`,
  DELETE_GROUPS_LIST: `${sso}${GROUP}/delete`,
  UPDATE_SPECIFIC_GROUP_LIST: `${sso}${GROUP}/update`,
  CREATE_GROUP: `${sso}${GROUP}/create`,
  DELETE_SPECIFIC_GROUP_DETAILS: `${sso}${GROUP}/delete`,
  SPECIFIC_GROUP_DETAILS: "group", // 'user/12

  //!RECONCILIATION-SERVICE --- DO NOT TOUCH
  REPORTING_TENDERS: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/reportingTenders`,
  REPORT_FIELD: `${RECONCILIATION_SERVICE}${PUBLIC}${CUSTOM}/reportFields`,
  DOWNLOAD_REPORT: `${RECONCILIATION_SERVICE}${PUBLIC}${CUSTOM}/download/report`,
  DASHBOARD_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/instore-data`,
  MPR_VS_BANK_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/mpr/vs/bank`,
  MPR_VS_BANK_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/mpr/vs/bank/download`,
  ORDER_VS_TRM_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/order/vs/trm`,
  ORDER_VS_TRM_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/order/vs/trm/download`,
  TRM_VS_MPR_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/trm/vs/mpr`,
  TRM_VS_MPR_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/trm/vs/mpr/download`,
  DATA_SOURCE_FIELD: `${RECONCILIATION_SERVICE}${PUBLIC}/api/v1/datasource`,
  UPLOAD_SOURCE_FIELD: `${RECONCILIATION_SERVICE}${PUBLIC}/api/v1/upload/data`,

  RECONCILIATION_LAST_SYNCED: `${RECONCILIATION_SERVICE}/api/ve1/datalog/lastSynced`,
  MISSING_TID_STORE_MAPPING: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/missingTIDMapping`,
  DOWNLOAD_TID_MISSING_STORE_MAPPING: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/missingTIDMappingReportDownload`,

  // 3PO-SERVICE
  _3PO_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/threePODashboardData`,
  //!DOWNLOAD API'S FOR TABLE
  UNRECONCILED: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/unreconciled/download`,
  SALE: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/sale/download`,
  RECONCILED: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/reconciled/download`,
  DOWNLOAD_ALL_REPORT: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/download`,
  DOWNLOAD_ASYNC_DASHBOARD_REPORT: `${RECONCILIATION_SERVICE}${PUBLIC}${DASHBOARD}/asyncDownload`,
  _3PO_DATA_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/dashboardData/asyncDownload`,
  RECEIVABLE_VS_RECEIPT_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/receivables/vs/receipts`,
  RECEIVABLE_VS_RECEIPT_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/receivables/vs/receipts/download`,
  _3PO_VS_DOTPE_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/3po/vs/dotpe`,
  POS_VS_3PO_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/pos/vs/3po`,
  POS_VS_DOTPE_DATA: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/pos/vs/dotpe`,
  _3PO_VS_DOTPE_DATA_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/3po/vs/dotpe/download`,
  POS_VS_3PO_DATA_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/pos/vs/3po/download`,
  POS_VS_DOTPE_DATA_DOWNLOAD: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/pos/vs/dotpe/download`,
  MISSING_STORE_MAPPING: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/missingStoreMappings`,
  DOWNLOAD_MISSING_STORE_MAPPING: `${RECONCILIATION_SERVICE}${PUBLIC}${_3PO}/missingStoreMappings/download`,

  //!VOUCHER API'S
  GET_VOUCHER_TYPE: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/getVoucherType`,
  GET_ALL_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/getAll`,
  EDIT_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/edit`,
  GET_ALL_CREATED_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/getAllCreated`,
  SEND_VOUCHER_FOR_APPROVAL: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/sendForApproval`,
  DOWNLOAD_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/download`,
  CREATE_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/create`,
  UPDATE_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/update`,
  APPROVE_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/approve`,
  DASHBOARD_VOUCHER: `${RECONCILIATION_SERVICE}${PUBLIC}${VOUCHER}/dashboard`,

  //!STORE API'S
  GET_STORE_DATA: `${RECONCILIATION_SERVICE}/api/ve1/store/list`,
  GET_STORE_LIST_DATA: `${RECONCILIATION_SERVICE}/api/ve1/store/storeList`,
  GET_CITY_LIST_DATA: `${RECONCILIATION_SERVICE}/api/ve1/store/cityList`,
  GET_STORE_UPLOAD: `${RECONCILIATION_SERVICE}/api/ve1/store/uploadStoreList?storeUpload=`,
  GET_UPLOAD_CONFIG_MAPPING: `${RECONCILIATION_SERVICE}/api/ve1/store/listUploadConfig`,
  UPLOAD_CONFIG_DATA: `${RECONCILIATION_SERVICE}/api/ve1/store/uploadConfig`,
  DOWNLOAD_TEMPLATE_DATA: `${RECONCILIATION_SERVICE}/api/ve1/store/downloadConfig`,
  DOWNLOAD_STORE_TEMPLATE_DATA: `${RECONCILIATION_SERVICE}/api/ve1/store/downloadStoreSync`,
  DOWNLOAD_ASYNC_GENERATE_REPORT_DATA: `${RECONCILIATION_SERVICE}/public/generated-reports/download`,
  GET_ASYNC_GENERATE_REPORT_DATA: `${RECONCILIATION_SERVICE}/public/generated-reports/getAll`,

  // New URLs
  GET_TENDER_LIST: `${RECONCILIATION_SERVICE}/api/v1/tenderList`,
  GET_TENDER_WISE_TABLES_LIST: `${RECONCILIATION_SERVICE}/api/v1/tenderWisetables`,
  SAVE_ALL_RECO_LOGICS: `${RECONCILIATION_SERVICE}/public/recologics/save`,
  UPDATE_ALL_RECO_LOGICS: `${RECONCILIATION_SERVICE}/public/recologics/update`,
  GET_ALL_RECO_LOGICS: `${RECONCILIATION_SERVICE}/public/recologics/getAll`,
  GET_RECO_LOGICS_BY_TOPIC: `${RECONCILIATION_SERVICE}/public/recologics/get`,
  GET_ALL_DATA_SOURCE_FOR_MAPPING: `${RECONCILIATION_SERVICE}/api/v1/datasource`,
  EXCEL_DB_COLUMN_MAPPING_BY_DATASOURCE: `${RECONCILIATION_SERVICE}/api/ve1/customisedfields/getExcelDbColumMappingByDataSource/`,
  UPDATE_EXCEL_DB_COLUMN_MAPPING_BY_DATASOURCE: `${RECONCILIATION_SERVICE}/api/ve1/customisedfields/updateExcelDbColumMapping`,
};

export { baseURL, ssoBaseURL, apiEndpoints, sso };
