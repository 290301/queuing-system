import './AddCustomerService.css';
import style from './AddCustomerService.module.scss';
import { Select, Modal } from 'antd';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { useNavigate } from 'react-router-dom';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { useState, useRef } from 'react';
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { ServiceType } from '../../../propsType/ServiceProps';
import { CustomerServiceType } from '../../../propsType/CustomerServiceProps';
import moment from 'moment';
import { addCustomerService } from '../../../../redux/features/CustomerServicesSlice';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

export const AddCustomerService = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch<any>();
      const serviceRef = useRef<{ value: string; label: string }>({ value: '', label: '' });
      const dataService = useSelector((state: State) => state.service);
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [infoCustomerService, SetInfoCustomerService] = useState<CustomerServiceType>({} as CustomerServiceType);
      const createCustomerService = async (data: CustomerServiceType) => {
            return await dispatch(addCustomerService(data));
      };
      const handlePrint = () => {
            if (serviceRef.current.label && serviceRef.current.value) {
                  const year = new Date().getFullYear();
                  const month = new Date().getMonth();
                  const day = new Date().getDate();
                  const randomNumber = Math.floor(Math.random() * 3) % 2 === 0;
                  const status = ['skip', 'complete', 'waiting'];
                  var ordinalNumberLocal: number;
                  if (window.localStorage.getItem('ordinalNumber')) {
                        const configNumber = JSON.parse(window.localStorage.getItem('ordinalNumber')!) + 1;
                        ordinalNumberLocal = configNumber;
                        window.localStorage.setItem('ordinalNumber', ordinalNumberLocal.toString());
                  } else {
                        window.localStorage.setItem('ordinalNumber', '1');
                        ordinalNumberLocal = 1;
                  }

                  const data: CustomerServiceType = {
                        customerName: 'Nguy???n V??n A',
                        key: uuid().slice(0, 8).toUpperCase(),
                        ordinalNumber: serviceRef.current.value + '' + ordinalNumberLocal,
                        origin: randomNumber ? 'Kiosk' : 'H??? th???ng',
                        serviceName: serviceRef.current.label,
                        serviceValue: serviceRef.current.value,
                        status: status[Math.floor(Math.random() * status.length)],
                        timeStart: new Date().getTime().valueOf(),
                        timeEnd: new Date(year, month, day, parseInt('17'), parseInt('30')).getTime(),
                        email: 'email@gmail.com',
                        phone: '0123',
                  };

                  SetInfoCustomerService(data);

                  createCustomerService(data)
                        .then((response: CustomerServiceType) => {
                              response && setIsOpen(true);
                        })
                        .catch((error: any) => {
                              console.log(error);
                        });
            } else {
                  toast.warning('Vui l??ng ch???n d???ch v???', { theme: 'dark' });
            }
      };
      const handleCancel = () => {
            setIsOpen(false);
      };
      const handleChangeSelect = (value: string, option: BaseOptionType | DefaultOptionType) => {
            serviceRef.current.label = option.children;
            serviceRef.current.value = option.value;
      };

      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Qu???n l?? c???p s???" />
                  <div className={cx('content')}>
                        <header className={cx('header-content')}>C???p s??? m???i</header>
                        <div className={cx('wrapper-select')}>
                              <p className={cx('label')}>D???ch v??? kh??ch h??ng l???a ch???n </p>
                              <div className={cx('select')}>
                                    <Select onChange={handleChangeSelect} placeholder="Ch???n d???ch v???">
                                          {dataService.dataServices.map((service: ServiceType) => {
                                                return (
                                                      <Select.Option key={service.id} value={service.id}>
                                                            {service.name}
                                                      </Select.Option>
                                                );
                                          })}
                                    </Select>
                                    <LogoArrow className={cx('logo-arrow')} />
                              </div>
                        </div>
                        <div className={cx('wrapper-btn')}>
                              <button onClick={() => navigate(-1)} type="button" className={cx('btn', 'btn-btnCancel')}>
                                    H???y b???
                              </button>
                              <button onClick={handlePrint} className={cx('btn', 'btn-btnPrint')}>
                                    In s???
                              </button>
                        </div>
                  </div>
                  <Modal
                        className="modal-CustomerService"
                        open={isOpen}
                        footer={null}
                        onCancel={handleCancel}
                        centered={true}
                  >
                        <div className="infoService">
                              <h3 className="header">S??? th??? t??? ???????c c???p</h3>
                              <p className="number">{infoCustomerService.ordinalNumber}</p>
                              <p className="nameService">
                                    DV: {infoCustomerService.serviceName}
                                    &nbsp;
                                    <span className="placeService">(t???i qu???y s??? 1)</span>
                              </p>
                        </div>
                        <div className="timeService">
                              <p>
                                    <span>Th???i gian c???p: </span>

                                    <span>{`${moment(infoCustomerService.timeStart)
                                          .locale('vi')
                                          .format('LT')} - ${moment(infoCustomerService.timeStart)
                                          .locale('vi')
                                          .format('L')}`}</span>
                              </p>
                              <p>
                                    <span> H???n s??? d???ng: </span>
                                    <span>{`${moment(infoCustomerService.timeEnd).locale('vi').format('LT')} - ${moment(
                                          infoCustomerService.timeEnd,
                                    )
                                          .locale('vi')
                                          .format('L')}`}</span>
                              </p>
                        </div>
                  </Modal>
            </div>
      );
};
