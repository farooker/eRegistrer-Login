/* eslint-disable no-undef */
// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/Error",
    name: "ErrorPage",
    component: () => import("@/views/Login/Error.vue"),
  },
  {
    path: "/SignIn",
    name: "SignInPage",
    component: () => import("@/views/Login/LoginPage.vue"),
  },
  {
    path: "/OtpVerify",
    name: "OtpVerifyPage",
    component: () => import("@/views/Login/LoginOtpPage.vue"),
  },

  {
    path: "/ForgetPassword",
    name: "ForgetPasswordPage",
    component: () => import("@/views/Login/ForgetPasswordPage.vue"),
  },
  {
    path: "/ResetPassword",
    name: "ResetPasswordPage",
    component: () => import("@/views/Login/NewPassword.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/AppDefault.vue"),
    children: [
      {
        path: "/",
        name: "HomePage",
        component: () => import("@/views/HomePage.vue"),
      },
      {
        path: "/ListRolesPage",
        name: "ListRolesPage",
        component: () => import("@/views/rules/ListRolesPage.vue"),
      },
      {
        path: "/UserManagement",
        name: "UserManagement",
        component: () => import("@/views/UserMangement/UserMangementPage.vue"),
      },
      {
        path: "/HistoryUserPage",
        name: "HistoryUserPage",
        component: () => import("@/views/HistoryLog/HistoryUserPage.vue"),
      },
      {
        path: "/CreateRolePage/:role_id?",
        name: "CreateRolePage",
        component: () => import("@/views/rules/CreateRolePage.vue"),
      },
      {
        path: "/HistoryTable",
        name: "HistoryTable",
        component: () => import("@/components/tables/HistoryTable.vue"),
      },
      {
        path: "/MasterTable",
        name: "MasterTable",
        component: () => import("@/components/tables/MasterTable.vue"),
      },
      {
        path: "/HistoryRolePage",
        name: "HistoryRolePage",
        component: () => import("@/views/historyLog/HistoryRolePage.vue"),
      },
      {
        path: "/MasterDataManagement",
        name: "MasterDataManagement",
        component: () => import("@/views/master-data/MasterDataManagement.vue"),
      },
      {
        path: "/CorparationDetail/:id?",
        name: "CorparationDetail",
        component: () =>
          import("@/views/master-data/details/CorparationDetail.vue"),
      },
      {
        path: "/BusinessUnitDetail/:id?",
        name: "BusinessUnitDetail",
        component: () =>
          import("@/views/master-data/details/BusinessUnitDetail.vue"),
      },
      {
        path: "/CompanyDetail/:id?",
        name: "CompanyDetail",
        component: () =>
          import("@/views/master-data/details/CompanyDetail.vue"),
      },
      {
        path: "/MasterDataManagement/TeamManagement/:id?",
        name: "TeamManagement",
        component: () => import("@/views/master-data/TeamManagement.vue"),
      },
      {
        path: "/HistoryTeamPage",
        name: "HistoryTeamPage",
        component: () => import("@/views/historyLog/HistoryTeamPage.vue"),
      },
      {
        path: "/CreditScorePage",
        name: "CreditScorePage",
        component: () =>
          import("@/views/sd-team-credit-score/CreditScorePage.vue"),
      },
      {
        path: "/SDTeamMangement/SDActiveMangement",
        name: "SDActiveMangementPage",
        component: () =>
          import("@/views/SDTeamMangement/SDActiveMangement.vue"),
      },
      {
        path: "/SDTeamMangement/RspPolicy",
        name: "RspPolicyPage",
        component: () => import("@/views/SDTeamMangement/RspPolicy.vue"),
      },
      {
        path: "/SDTeamMangement/RspPolicyUploaded",
        name: "RspPolicyUploadedPage",
        component: () =>
          import("@/views/SDTeamMangement/RspPolicyUploaded.vue"),
      },
      {
        path: "/SDTeamMangement/Survey",
        name: "SurveyPage",
        component: () => import("@/views/SDTeamMangement/Survey.vue"),
      },
      {
        path: "/SDTeamMangement/Survey/Created",
        name: "SurveyCreatePage",
        component: () => import("@/views/SDTeamMangement/SurveyCreate.vue"),
      },
      {
        path: "/SDTeamMangement/Traning",
        name: "TraningPage",
        component: () => import("@/views/SDTeamMangement/Traning.vue"),
      },
      {
        path: "/SDTeamMangement/TraningCreated",
        name: "TraningCreatedPage",
        component: () => import("@/views/SDTeamMangement/TraningCreated.vue"),
      },
      {
        path: "/SDTeamDashboard/TrackingSDActivite",
        name: "TrackingSDActivitePage",
        component: () =>
          import("@/views/SDTeamDashboard/TrackingSDActivite.vue"),
      },
      {
        path: "/SDTeamDashboard/FollowUp/:owner?/:vendor?",
        name: "FollowUpPage",
        component: () => import("@/views/SDTeamDashboard/FollowUp.vue"),
      },
      {
        path: "/SDTeamDashboard/Documents",
        name: "DocumentsPage",
        component: () => import("@/views/SDTeamDashboard/Documents.vue"),
      },
      {
        path: "/SDTeamDashboard/AttachFileSurvey",
        name: "AttachFileSurveyPage",
        component: () => import("@/views/SDTeamDashboard/AttachFileSurvey.vue"),
      },

      {
        path: "/Account/AccountTask",
        name: "AccountManagement",
        component: () => import("@/views/accounts/AccountManagement.vue"),
      },
      //Account
      {
        path: "/Account/AccountDetail/:id?",
        name: "AccountDetail",
        component: () => import("@/views/accounts/AccountDetail.vue"),
      },
      //business
      {
        path: "/BusinessPartner/BusinessPartnerList",
        name: "BusinessPartnerList",
        component: () =>
          import("@/views/BusinessPartner/BusinessPartnerList.vue"),
      },
      {
        path: "/BusinessPartner/SearchBusinessPartner",
        name: "SearchBusinessPartner",
        component: () =>
          import("@/views/BusinessPartner/SearchBusinessPartner.vue"),
      },
      {
        path: "/BusinessPartner/CreateBusinessPartner",
        name: "CreateBusinessPartner",
        component: () =>
          import("@/views/BusinessPartner/CreateBusinessPartner.vue"),
      },
      {
        path: "/BusinessPartner/ChangInfo",
        name: "ChangInfo",
        component: () => import("@/views/BusinessPartner/ChangInfo.vue"),
      },
      ///ExtendCompany
      {
        path: "/BusinessPartner/ExtendCompany",
        name: "ExtendCompany",
        component: () => import("@/views/BusinessPartner/ExtendCompany.vue"),
      },

      {
        path: "/BusinessPartner/CustomerVendor",
        name: "CustomerVendor",
        component: () => import("@/views/BusinessPartner/CustomerVendor.vue"),
      },
      {
        path: "/BusinessPartner/VandorCustomer",
        name: "VandorCustomer",
        component: () => import("@/views/BusinessPartner/VandorCustomer.vue"),
      },
      ////

      {
        path: "/BusinessPartner/ExtendRole",
        name: "ExtendRole",
        component: () => import("@/views/BusinessPartner/ExtendRole.vue"),
      },
      {
        path: "/BusinessPartner/AttachedDocument",
        name: "AttachedDocument",
        component: () => import("@/views/BusinessPartner/AttachedDocument.vue"),
      },

      {
        path: "/accounts/AccountDashBoard",
        name: "AccountDashBoard",
        component: () => import("@/views/accounts/AccountDashBoard.vue"),
      },

      {
        path: "/accounts/extendcompany",
        name: "AccountExtendCompany",
        component: () => import("@/views/accounts/type-account/AccountExtendCompany.vue"),
      },

      {
        path: "/accounts/AccountChangeInfo",
        name: "AccountChangeInfo",
        component: () => import("@/views/accounts/type-account/AccountChangeInfor.vue"),
      },

      {
        path: "/accounts/extendrole",
        name: "AccountExtendRole",
        component: () => import("@/views/accounts/type-account/AccountExtendRole.vue"),
      },

      {
        path: "/MemberManagementPage",
        name: "MemberManagementPage",
        component: () =>
          import("@/views/MemberManagement/MemberManagementPage.vue"),
      },
      {
        path: "/GenerateLinkPage",
        name: "GenerateLinkPage",
        component: () => import("@/views/GenerateLink/GenerateLinkPage.vue"),
      },
      {
        path: "/CompanyManagement",
        name: "CompanyManagement",
        component: () => import("@/views/company-managements/CompanyManagement.vue"),
      },
      {
        path: '/DisclosureManagement',
        name: 'DisclosureManagement',
        component: () => import('@/views/Disclosure/DisclosurePage.vue'),
      },

      {
        path: '/TestWork',
        name: 'TestWork',
        component: () => import('@/views/Disclosure/TestWork.vue'),
      },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
