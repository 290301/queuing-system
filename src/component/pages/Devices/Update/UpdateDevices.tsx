import { useEffect, useState } from 'react';
import './UpdateDevices.css';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { State } from '../../../../redux/store';
import { Select } from 'antd';
import { DevicesType } from '../../../propsType/DevicesProps';
import style from './UpdateDevices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';

//  import library handle form
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const cx = classNames.bind(style);

const schema: yup.SchemaOf<Partial<DevicesType>> = yup.object({
      id: yup.string().trim().required('Vui lòng điền vào trường này'),
      ipAddress: yup.string().trim().required('Vui lòng điền vào trường này'),
      isActive: yup.boolean().notRequired(),
      isConnected: yup.boolean().notRequired(),
      key: yup.string().trim().notRequired(),
      name: yup.string().trim().required('Vui lòng điền vào trường này'),
      used: yup.array().min(1, 'Vui lòng chọn ít nhất 1 dịch vụ').required('Vui lòng ít nhất 1 dịch vụ'),
});

export const UpdateDevices = () => {
      const [devices, setDevices] = useState<DevicesType | undefined>({} as DevicesType);
      const [deviceUsed, setDeviceUsed] = useState<string[] | []>([]);
      const [deviceName, setDeviceName] = useState<string[] | []>([]);
      const { id } = useParams();
      const navigate = useNavigate();
      const dataDevices = useSelector((state: State) => state.device);

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
            control,
      } = useForm<DevicesType>({
            defaultValues: devices,
            resolver: yupResolver(schema),
      });

      const onSubmit: SubmitHandler<DevicesType> = (data) => {
            console.log(data);
      };
      useEffect(() => {
            // ---- Xử lý lấy ra mảng các dịch vụ không trùng nhau để render cho thẻ Select
            const listDeviceUsed: string[] = [];
            dataDevices.dataDevices.map((device: DevicesType) => {
                  device.used.map((deviceUsed) => {
                        if (!listDeviceUsed.includes(deviceUsed)) {
                              listDeviceUsed.push(deviceUsed);
                        }
                  });
            });
            setDeviceUsed(listDeviceUsed);

            // ---- Xử lý lấy ra mảng các  tên dịch vụ không trùng nhau để render cho thẻ Select
            const listDeviceName: string[] = [];
            dataDevices.dataDevices.map((device: DevicesType) => {
                  if (!listDeviceName.includes(device.name)) {
                        listDeviceName.push(device.name);
                  }
            });
            setDeviceName(listDeviceName);

            // ---- Xử lý lấy ra thông tin 1 dịch vụ
            var infoDevices = dataDevices.dataDevices.find((device: DevicesType) => {
                  return device?.id === id && device;
            });
            setDevices(infoDevices);
            reset(infoDevices);
      }, []);

      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Thông tin thiết bị" />
                  <div className={cx('table-content')}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                              <div className={cx('content')}>
                                    <header className={cx('header-content')}>Thông tin thiết bị</header>
                                    <div className={cx('info-devices')}>
                                          <div className={cx('double-object')}>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Mã thiết bị: <span className={cx('required')}>*</span>{' '}
                                                            {errors.id?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.id?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            {...register('id')}
                                                      />
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Loại thiết bị: <span className={cx('required')}>*</span>{' '}
                                                            {errors.name?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.name?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <div className="wrapper-select-inputKindOfDevices">
                                                            <Controller
                                                                  name="name"
                                                                  rules={{ required: true }}
                                                                  control={control}
                                                                  render={({ field }) => (
                                                                        <Select
                                                                              placeholder="Nhập vai trò"
                                                                              {...field}
                                                                              options={deviceName.map((name) => {
                                                                                    return {
                                                                                          value: name,
                                                                                          label: name,
                                                                                    };
                                                                              })}
                                                                        />
                                                                  )}
                                                            />
                                                            <LogoArrow className="logo-arrow" />
                                                      </div>
                                                </div>
                                          </div>
                                          <div className={cx('double-object')}>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Tên thiết bị: <span className={cx('required')}>*</span>{' '}
                                                            {errors.name?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.name?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            {...register('name')}
                                                      />
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Tên đăng nhập: <span className={cx('required')}>*</span>
                                                      </p>
                                                      <input className={cx('input-field')} type="text" />
                                                </div>
                                          </div>
                                          <div className={cx('double-object')}>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Địa chỉ IP: <span className={cx('required')}>*</span>{' '}
                                                            {errors.ipAddress?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.ipAddress?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            {...register('ipAddress')}
                                                      />
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Mật khẩu: <span className={cx('required')}>*</span>
                                                      </p>
                                                      <input className={cx('input-field')} type="text" />
                                                </div>
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Dịch vụ sử dụng <span className={cx('required')}>*</span>{' '}
                                                      {errors.used?.message && (
                                                            <span className={cx('errorMessage')}>
                                                                  {errors.used?.message}
                                                            </span>
                                                      )}
                                                </p>
                                                <div className="wrapper-select-listUseDevices">
                                                      <Controller
                                                            name="used"
                                                            rules={{ required: true }}
                                                            control={control}
                                                            render={({ field }) => (
                                                                  <Select
                                                                        mode="multiple"
                                                                        placeholder="Please select"
                                                                        {...field}
                                                                        options={deviceUsed.map((device) => {
                                                                              return {
                                                                                    value: device,
                                                                                    label: device,
                                                                              };
                                                                        })}
                                                                  />
                                                            )}
                                                      />
                                                </div>
                                          </div>
                                          <p className={cx('label')}>
                                                <span className={cx('required')}>*</span>
                                                <span style={{ color: 'var(--color-gray-300)', marginLeft: '10px' }}>
                                                      Là trường thông tin bắt buộc
                                                </span>
                                          </p>
                                    </div>
                              </div>
                              <div className={cx('wrapper-btn')}>
                                    <button onClick={() => navigate(-1)} className={cx('btn', 'btn-btnCancel')}>
                                          Hủy bỏ
                                    </button>
                                    <button type="submit" className={cx('btn', 'btn-btnUpdate')}>
                                          Cập nhật
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};
