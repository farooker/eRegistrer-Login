/* eslint-disable no-undef */
// Composables

import { createRouter, createWebHistory } from "vue-router";
// import { useSessionInfoStore } from "@/stores/sessionInfoStore";
// // import { pinia } from "@/main";
// import { registerPlugins } from '@/plugins'
const routes = [
  {
    path: "/Error/:err?",
    name: "ErrorPage",
    meta: {
      requiresAuth :false,
      module_id: null
    },
    component: () => import("@/views/Login/Error.vue"),
  },
  {
    path: "/SignIn",
    name: "SignInPage",
    meta: {
      requiresAuth :false,
      module_id: null
    },
    component: () => import("@/views/Login/LoginPage.vue"),
  },
  {
    path: "/OtpVerify",
    name: "OtpVerifyPage",
    meta: {
      requiresAuth :false,
      module_id: null
    },
    component: () => import("@/views/Login/LoginOtpPage.vue"),
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPasswordPage",
    meta: {
      requiresAuth :false,
      module_id: null
    },
    component: () => import("@/views/Login/ForgetPasswordPage.vue"),
  },
  {
    path: "/ResetPassword",
    name: "ResetPasswordPage",
    meta: {
      requiresAuth :false,
      module_id: null
    },
    component: () => import("@/views/Login/NewPassword.vue"),
  },
  {
    path: "/Authorization",
    name: "AuthorizationPage",
    meta: {
      requiresAuth :false,
      module_id: null
    },
    component: () => import("@/views/Login/Authorization.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/AppDefault.vue"),
    children: [
      {
        path: "/",
        name: "HomePage",
        meta: {
          requiresAuth :true,
          module_id: 1
        },
        component: () => import("@/views/HomePage.vue"),
      },
      {
        path: "/UserManagement",
        name: "UserManagement",
        meta: {
          requiresAuth :true,
          module_id: 2
        },
        component: () => import("@/views/UserMangement/UserMangementPage.vue"),
      },
      {
        path: "/ListRolesPage",
        name: "ListRolesPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/rules/ListRolesPage.vue"),
      },
      {
        path: "/HistoryUserPage",
        name: "HistoryUserPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/HistoryLog/HistoryUserPage.vue"),
      },
      {
        path: "/CreateRolePage/:role_id?",
        name: "CreateRolePage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/rules/CreateRolePage.vue"),
      },
      {
        path: "/HistoryTable",
        name: "HistoryTable",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/components/tables/HistoryTable.vue"),
      },
      {
        path: "/MasterTable",
        name: "MasterTable",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/components/tables/MasterTable.vue"),
      },
      {
        path: "/HistoryRolePage",
        name: "HistoryRolePage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/historyLog/HistoryRolePage.vue"),
      },
      {
        path: "/MasterDataManagement",
        name: "MasterDataManagement",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/master-data/MasterDataManagement.vue"),
      },
      {
        path: "/CorparationDetail/:id?",
        name: "CorparationDetail",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/master-data/details/CorparationDetail.vue"),
      },
      {
        path: "/BusinessUnitDetail/:id?",
        name: "BusinessUnitDetail",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/master-data/details/BusinessUnitDetail.vue"),
      },
      {
        path: "/CompanyDetail/:id?",
        name: "CompanyDetail",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/master-data/details/CompanyDetail.vue"),
      },
      {
        path: "/MasterDataManagement/TeamManagement/:id?",
        name: "TeamManagement",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/master-data/TeamManagement.vue"),
      },
      {
        path: "/HistoryTeamPage",
        name: "HistoryTeamPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/historyLog/HistoryTeamPage.vue"),
      },
      {
        path: "/CreditScorePage",
        name: "CreditScorePage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/sd-team-credit-score/CreditScorePage.vue"),
      },
      {
        path: "/SDTeamMangement/SDActiveMangement",
        name: "SDActiveMangementPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/SDTeamMangement/SDActiveMangement.vue"),
      },
      {
        path: "/SDTeamMangement/RspPolicy",
        name: "RspPolicyPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamMangement/RspPolicy.vue"),
      },
      {
        path: "/SDTeamMangement/RspPolicyUploaded",
        name: "RspPolicyUploadedPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/SDTeamMangement/RspPolicyUploaded.vue"),
      },
      {
        path: "/SDTeamMangement/Survey",
        name: "SurveyPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamMangement/Survey.vue"),
      },
      {
        path: "/SDTeamMangement/Survey/Created",
        name: "SurveyCreatePage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamMangement/SurveyCreate.vue"),
      },
      {
        path: "/SDTeamMangement/Traning",
        name: "TraningPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamMangement/Traning.vue"),
      },
      {
        path: "/SDTeamMangement/TraningCreated",
        name: "TraningCreatedPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamMangement/TraningCreated.vue"),
      },
      {
        path: "/SDTeamDashboard/TrackingSDActivite",
        name: "TrackingSDActivitePage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/SDTeamDashboard/TrackingSDActivite.vue"),
      },
      {
        path: "/SDTeamDashboard/FollowUp/:owner?/:vendor?",
        name: "FollowUpPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamDashboard/FollowUp.vue"),
      },
      {
        path: "/SDTeamDashboard/Documents",
        name: "DocumentsPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamDashboard/Documents.vue"),
      },
      {
        path: "/SDTeamDashboard/AttachFileSurvey",
        name: "AttachFileSurveyPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/SDTeamDashboard/AttachFileSurvey.vue"),
      },

      {
        path: "/Account/AccountTask",
        name: "AccountManagement",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/accounts/AccountManagement.vue"),
      },
      //Account
      {
        path: "/Account/AccountDetail/:id?",
        name: "AccountDetail",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/accounts/AccountDetail.vue"),
      },
      //business
      {
        path: "/BusinessPartner/BusinessPartnerList",
        name: "BusinessPartnerList",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/BusinessPartner/BusinessPartnerList.vue"),
      },
      {
        path: "/BusinessPartner/SearchBusinessPartner",
        name: "SearchBusinessPartner",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/BusinessPartner/SearchBusinessPartner.vue"),
      },
      {
        path: "/BusinessPartner/CreateBusinessPartner",
        name: "CreateBusinessPartner",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/BusinessPartner/CreateBusinessPartner.vue"),
      },
      {
        path: "/BusinessPartner/ChangInfo",
        name: "ChangInfo",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/BusinessPartner/ChangInfo.vue"),
      },
      ///ExtendCompany
      {
        path: "/BusinessPartner/ExtendCompany",
        name: "ExtendCompany",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/BusinessPartner/ExtendCompany.vue"),
      },

      {
        path: "/BusinessPartner/CustomerVendor",
        name: "CustomerVendor",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/BusinessPartner/CustomerVendor.vue"),
      },
      {
        path: "/BusinessPartner/VandorCustomer",
        name: "VandorCustomer",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/BusinessPartner/VandorCustomer.vue"),
      },
      ////

      {
        path: "/BusinessPartner/ExtendRole",
        name: "ExtendRole",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/BusinessPartner/ExtendRole.vue"),
      },
      {
        path: "/BusinessPartner/AttachedDocument",
        name: "AttachedDocument",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/BusinessPartner/AttachedDocument.vue"),
      },

      {
        path: "/accounts/AccountDashBoard",
        name: "AccountDashBoard",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/accounts/AccountDashBoard.vue"),
      },

      {
        path: "/accounts/extendcompany",
        name: "AccountExtendCompany",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/accounts/type-account/AccountExtendCompany.vue"),
      },

      {
        path: "/accounts/AccountChangeInfo",
        name: "AccountChangeInfo",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/accounts/type-account/AccountChangeInfor.vue"),
      },

      {
        path: "/accounts/extendrole",
        name: "AccountExtendRole",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/accounts/type-account/AccountExtendRole.vue"),
      },

      {
        path: "/MemberManagementPage",
        name: "MemberManagementPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () =>
          import("@/views/MemberManagement/MemberManagementPage.vue"),
      },
      {
        path: "/GenerateLinkPage",
        name: "GenerateLinkPage",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/GenerateLink/GenerateLinkPage.vue"),
      },
      {
        path: "/CompanyManagement",
        name: "CompanyManagement",
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import("@/views/company-managements/CompanyManagement.vue"),
      },
      {
        path: '/DisclosureManagement',
        name: 'DisclosureManagement',
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import('@/views/Disclosure/DisclosurePage.vue'),
      },
      {
        path: '/TestWork',
        name: 'TestWork',
        meta: {
          requiresAuth :true,
          module_id: null
        },
        component: () => import('@/views/Disclosure/TestWork.vue'),
      },

    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let module = sessionStorage.getItem("auth_modules");
    if(module !== null || module !== undefined || module !== '') {
      const  modules =  JSON.parse(module);
      const  toModuleId = to.meta.module_id;
      const  allowed =  modules.includes(toModuleId);
      if(!allowed){
        next('/Error?err=NOT_FOUND');
      }
    }
  }
  next();

});
export default router;
