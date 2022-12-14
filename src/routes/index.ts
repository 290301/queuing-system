import { ListActionHistory } from './../components/pages/Setting/ActionHistory/List/ListActionHistory';
// Dashboard
import { DashboardPage } from '../components/pages/Dashboard/Dashboard';

// Devices
import DevicesPage from '../components/pages/Devices';
import { ListDevices } from '../components/pages/Devices/List/ListDevices';
import { AddDevices } from '../components/pages/Devices/Add/AddDevices';
import { DetailsDevices } from '../components/pages/Devices/Details/DetailsDevices';
import { UpdateDevices } from '../components/pages/Devices/Update/UpdateDevices';

// Services
import ServicesPage from '../components/pages/Services';
import { ListServices } from '../components/pages/Services/List/ListServices';
import { DetailsServices } from '../components/pages/Services/Details/DetailsServices';
import { AddServices } from '../components/pages/Services/Add/AddServices';

// CustomerService
import CustomerService from '../components/pages/CustomerService';
import { ListCustomerService } from '../components/pages/CustomerService/List/ListCustomerService';
import { AddCustomerService } from '../components/pages/CustomerService/Add/AddCustomerService';
import { UpdateServices } from '../components/pages/Services/Update/UpdateServices';

// Report
import ReportPage from '../components/pages/Report';
import { ListReport } from '../components/pages/Report/List/ListReport';

// Setting
import SettingPage from '../components/pages/Setting';

// Setting => Role
import { ListRole } from '../components/pages/Setting/Role/ListRole/ListRole';
import { AddRole } from '../components/pages/Setting/Role/AddRole/AddRole';
import { UpdateRole } from '../components/pages/Setting/Role/UpdateRole/UpdateRole';

// Setting => Account
import { ListAccount } from '../components/pages/Setting/Account/ListAccount/ListAccount';
import { UpdateAccount } from '../components/pages/Setting/Account/UpdateAccount/UpdateAccount';

// User Account
import { ForgotPasswordPage } from '../components/pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../components/pages/ResetPassword/ResetPassword';
import { LoginPage } from '../components/pages/Login/Login';

import { routesConfig } from './routeConfig';
import { AddAccount } from '../components/pages/Setting/Account/AddAccount/AddAccount';
import { InfoUser } from '../components/pages/InfoUser/InfoUser';
import { DetailsCustomerService } from '../components/pages/CustomerService/Details/DetailsCustomerService';
import { Page404 } from '../components/pages/Page404/Page404';

export type RouteProps = {
      path: string;
      component: any;
      layout?: any;
      translate?: string;
      pageHeader: string;
};

const privateRoutes: RouteProps[] = [
      // Dashboard
      {
            path: routesConfig.dashboard,
            component: DashboardPage,
            translate: 'Dashboard',
            pageHeader: routesConfig.dashboard,
      },

      // Devices
      {
            path: routesConfig.devices,
            component: DevicesPage,
            translate: 'Thi???t b???',
            pageHeader: routesConfig.devices,
      },
      {
            path: routesConfig.addDevices,
            component: AddDevices,
            translate: 'Th??m thi???t b???',
            pageHeader: routesConfig.addDevices,
      },
      {
            path: routesConfig.detailsDevices,
            component: DetailsDevices,
            translate: 'Chi ti???t thi???t b???',
            pageHeader: '/devices/detailsDevices',
      },
      {
            path: routesConfig.updateDevices,
            component: UpdateDevices,
            translate: 'C???p nh???t thi???t b???',
            pageHeader: '/devices/updateDevices',
      },
      {
            path: routesConfig.listDevices,
            component: ListDevices,
            translate: 'Danh s??ch thi???t b???',
            pageHeader: routesConfig.listDevices,
      },

      // Services
      {
            path: routesConfig.services,
            component: ServicesPage,
            translate: 'D???ch v???',
            pageHeader: routesConfig.services,
      },
      {
            path: routesConfig.listServices,
            component: ListServices,
            translate: 'Danh s??ch d???ch v???',
            pageHeader: routesConfig.listServices,
      },
      {
            path: routesConfig.detailsServices,
            component: DetailsServices,
            translate: 'Chi ti???t d???ch v???',
            pageHeader: '/services/detailsServices',
      },
      {
            path: routesConfig.updateServices,
            component: UpdateServices,
            translate: 'C???p nh???t d???ch v???',
            pageHeader: '/services/updateServices',
      },
      {
            path: routesConfig.addServices,
            component: AddServices,
            translate: 'Th??m d???ch v???',
            pageHeader: routesConfig.addServices,
      },

      // CustomerService
      {
            path: routesConfig.customerService,
            component: CustomerService,
            translate: 'C???p s???',
            pageHeader: routesConfig.customerService,
      },
      {
            path: routesConfig.listCustomerService,
            component: ListCustomerService,
            translate: 'Danh s??ch c???p s???',
            pageHeader: routesConfig.listCustomerService,
      },
      {
            path: routesConfig.addCustomerService,
            component: AddCustomerService,
            translate: 'C???p s??? m???i',
            pageHeader: routesConfig.addCustomerService,
      },
      {
            path: routesConfig.detailsCustomerService,
            component: DetailsCustomerService,
            translate: 'Chi ti???t c???p s???',
            pageHeader: '/customerService/detailsCustomerService',
      },

      // Report
      {
            path: routesConfig.report,
            component: ReportPage,
            translate: 'B??o c??o',
            pageHeader: routesConfig.report,
      },
      {
            path: routesConfig.listReport,
            component: ListReport,
            translate: 'L???p b??o c??o',
            pageHeader: routesConfig.listReport,
      },

      // Setting Page
      {
            path: routesConfig.setting,
            component: SettingPage,
            translate: 'C??i ?????t h??? th???ng',
            pageHeader: routesConfig.setting,
      },

      // Setting Page => Role
      {
            path: routesConfig.listRole,
            component: ListRole,
            translate: 'Qu???n l?? vai tr??',
            pageHeader: routesConfig.listRole,
      },
      {
            path: routesConfig.addRole,
            component: AddRole,
            translate: 'Th??m vai tr??',
            pageHeader: routesConfig.addRole,
      },
      {
            path: routesConfig.updateRole,
            component: UpdateRole,
            translate: 'C???p nh???t vai tr??',
            pageHeader: '/setting/updateRole',
      },
      // Setting Page => Account
      {
            path: routesConfig.listAccount,
            component: ListAccount,
            translate: 'Qu???n l?? t??i kho???n',
            pageHeader: routesConfig.listAccount,
      },
      {
            path: routesConfig.updateAccount,
            component: UpdateAccount,
            translate: 'C???p nh???t t??i kho???n',
            pageHeader: '/setting/updateAccount',
      },
      {
            path: routesConfig.addAccount,
            component: AddAccount,
            translate: 'Th??m t??i kho???n',
            pageHeader: routesConfig.addAccount,
      },

      // Setting Page => Action History
      {
            path: routesConfig.listActionHistory,
            component: ListActionHistory,
            translate: 'Nh???t k?? ho???t ?????ng',
            pageHeader: routesConfig.listActionHistory,
      },

      // InfoUser
      {
            path: routesConfig.infoUser,
            component: InfoUser,
            translate: 'Th??ng tin c?? nh??n',
            pageHeader: routesConfig.infoUser,
      },

     
];

const publicRoutes: RouteProps[] = [
      {
            path: routesConfig.login,
            component: LoginPage,
            translate: '????ng nh???p',
            pageHeader: routesConfig.login,
      },
      {
            path: routesConfig.forgotPassword,
            component: ForgotPasswordPage,
            translate: 'Qu??n m???t kh???u',
            pageHeader: routesConfig.resetPassword,
      },
      {
            path: routesConfig.resetPassword,
            component: ResetPassword,
            translate: '?????t l???i m???t kh???u',
            pageHeader: routesConfig.resetPassword,
      },
      
];

export { publicRoutes, privateRoutes };
