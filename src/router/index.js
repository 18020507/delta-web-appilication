import { createRouter, createWebHistory } from "vue-router";
import SignInSignUpViewVue from "@/views/login/SignInSignUpView.vue";
import LoginView from "@/views/login/Login/LoginView.vue";
import RegisterViewVue from "@/views/login/Register/RegisterView.vue";
import HomeViewVue from "@/views/home/HomeView.vue";
import DriverRequestView from "@/views/request/driver-request/DriverRequestView.vue";
import ShopRequestView from "@/views/request/shop-request/ShopRequestView.vue";
import DriverManagementView from "@/views/management/driver-management/DriverManagementView.vue";
import TruckManagementView from "@/views/management/truck-management/TruckManagementView.vue";
import HandoverManagementView from "@/views/management/handover-management/HandoverManagementView.vue";
import TruckRegistrationManagementView from "@/views/management/truck-registration/TruckRegistrationView.vue"
import GeneratorManagementView from "@/views/management/generator-management/GeneratorManagementView.vue"
import AccountDetailView from "@/views/account/AccountDetailView.vue"

const login = [
  {
    path: "/",
    component: SignInSignUpViewVue,
    children: [
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterViewVue,
      },
    ],
  },
];

const home = [
  {
    path: "/home",
    component: HomeViewVue,
  },
];

const driverRequest = [
  {
    path: "/driver-request",
    component: DriverRequestView,
  },
];

const shopRequest = [
  {
    path: "/repair-place-request",
    component: ShopRequestView,
  },
];

const driverManagement = [
  {
    path: "/driver-management",
    component: DriverManagementView,
  },
];

const truckManagement = [
  {
    path: "/truck-management",
    component: TruckManagementView,
  },
];

const TruckHandoverManagement = [
  {
    path: "/handover-management",
    component: HandoverManagementView,
  },
];

const TruckRegistration = [
  {
    path: "/truck-registration-management",
    component: TruckRegistrationManagementView,
  },
];

const Generator = [
  {
    path: "/generator-management",
    component: GeneratorManagementView,
  }
]

const Account = [
  {
    path: "/account",
    component: AccountDetailView,
  }
]

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  ...login,
  ...home,
  ...driverRequest,
  ...shopRequest,
  ...driverManagement,
  ...truckManagement,
  ...TruckHandoverManagement,
  ...TruckRegistration,
  ...Generator,
  ...Account
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
