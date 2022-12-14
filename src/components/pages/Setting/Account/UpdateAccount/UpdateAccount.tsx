import style from './UpdateAccount.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { State } from '../../../../../redux/store';
import { useEffect, useRef, useState } from 'react';
import { UserType } from '../../../../propsType/UserProps';
import { LogoArrow } from '../../../../../assets/svg/LogoArrow';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { RoleType } from '../../../../propsType/RoleProps';
import { updateUser } from '../../../../../redux/features/UserSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import { updateRoleQuantity } from '../../../../../redux/features/RoleSlice';
import { routesConfig } from '../../../../../routes/routeConfig';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

type formType = UserType & {
      confirmPassword: string;
};

export const UpdateAccount = () => {
      const dataUser = useSelector((state: State) => state.user);
      const dataRole = useSelector((state: State) => state.role);
      const [user, setUser] = useState<formType | {}>({} as formType);
      const [listRole, setListRole] = useState<RoleType[] | []>([]);
      const currentFormData = useRef<formType>({} as formType);
      const dispatch = useDispatch<any>();
      const { id } = useParams();
      const navigate = useNavigate();

      const schema: yup.SchemaOf<Partial<formType>> = yup.object({
            fullName: yup.string().required('Vui lòng điền vào trường này').trim(),
            userName: yup.string().required('Vui lòng điền vào trường này').trim(),
            phone: yup.string().trim().phone('VN', true, 'Vui lòng nhập đúng định dạng số điện thoại'),
            email: yup
                  .string()
                  .trim()
                  .required('Vui lòng điền vào trường này')
                  .email('Vui lòng điền đúng định dạng email'),
            password: yup
                  .string()
                  .trim()
                  .required('Vui lòng điền vào trường này')
                  .min(10, 'Tối thiểu phải có 10 ký tự'),
            confirmPassword: yup
                  .string()
                  .required('Vui lòng điền vào trường này')
                  .oneOf([yup.ref('password'), null], '2 mật khẩu phải trùng nhau'),
            active: yup.boolean().notRequired(),
            img: yup.string().notRequired(),
            key: yup.string().notRequired(),
            roleName: yup.string().notRequired(),
      });

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
            control,
      } = useForm<formType>({
            resolver: yupResolver(schema),
            defaultValues: user,
      });

      const onSubmit: SubmitHandler<formType> = (data) => {
            try {
                  dispatch(updateUser(data));
                  if (data.roleName !== currentFormData.current.roleName) {
                        const subtractionQuantityRole = dataRole.data.find(
                              (role) => role.roleName === currentFormData.current.roleName,
                        );
                        const additionQuantityRole = dataRole.data.find((role) => role.roleName === data.roleName);
                        if (subtractionQuantityRole !== undefined && additionQuantityRole !== undefined) {
                              dispatch(
                                    updateRoleQuantity({
                                          arrayRole: [additionQuantityRole, subtractionQuantityRole],
                                          type: 'additionAndSubtraction',
                                    }),
                              );
                        } else {
                              console.log('CurrentRole or PrevRole was undefined');
                        }
                  }
                  toast.success('Cập nhật thành công', { theme: 'dark' });
                  navigate(routesConfig.listAccount);
            } catch (error) {
                  toast.error('Cập nhật thất bại', { theme: 'dark' });
                  console.error(error);
            }
      };

      useEffect(() => {
            const infoUser = dataUser.data.find((user: UserType) => {
                  return user.key.toString() === id?.toString() && user;
            });
            const formDefaultValue: formType = { ...infoUser!, confirmPassword: infoUser?.password! };
            setUser(formDefaultValue);
            reset(formDefaultValue);
            currentFormData.current = formDefaultValue;
            setListRole(dataRole.data);
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dataUser.data, id]);

      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý tài khoản" />
                  <div className={cx('table-content')}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                              <div className={cx('content')}>
                                    <header className={cx('header-content')}>Thông tin tài khoản</header>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Họ tên: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      placeholder="Nhập họ tên"
                                                      type="text"
                                                      {...register('fullName')}
                                                />
                                                {errors.fullName?.message && (
                                                      <p className={cx('errorMessage')}>{errors.fullName?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Tên đăng nhập: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập tên đăng nhập"
                                                      {...register('userName')}
                                                />
                                                {errors.userName?.message && (
                                                      <p className={cx('errorMessage')}>{errors.userName?.message}</p>
                                                )}
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Số điện thoại: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập số điện thoại"
                                                      {...register('phone')}
                                                />
                                                {errors.phone?.message && (
                                                      <p className={cx('errorMessage')}>{errors.phone?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Mật khẩu: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="password"
                                                      placeholder="Nhập mật khẩu"
                                                      {...register('password')}
                                                />
                                                {errors.password?.message && (
                                                      <p className={cx('errorMessage')}>{errors.password?.message}</p>
                                                )}
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Email: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập email"
                                                      {...register('email')}
                                                />
                                                {errors.email?.message && (
                                                      <p className={cx('errorMessage')}>{errors.email?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Nhập lại mật khẩu: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="password"
                                                      placeholder="Nhập lại mật khẩu"
                                                      {...register('confirmPassword')}
                                                />
                                                {errors.confirmPassword?.message && (
                                                      <p className={cx('errorMessage')}>
                                                            {errors.confirmPassword?.message}
                                                      </p>
                                                )}
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Vai trò <span className={cx('required')}>*</span>
                                                </p>
                                                <div className={cx('select', 'selectRole')}>
                                                      {/* xài controller nếu sử dụng library UI  link: https://legacy.react-hook-form.com/get-started/#IntegratingwithUIlibraries*/}
                                                      <Controller
                                                            name="roleName"
                                                            rules={{ required: true }}
                                                            control={control}
                                                            render={({ field }) => (
                                                                  <Select
                                                                        placeholder="Nhập vai trò"
                                                                        {...field}
                                                                        options={listRole.map((role: RoleType) => {
                                                                              return {
                                                                                    value: role.roleName,
                                                                                    label: role.roleName,
                                                                              };
                                                                        })}
                                                                  />
                                                            )}
                                                      />
                                                      <LogoArrow className={cx('logoArrow')} />
                                                </div>
                                                {errors.roleName?.message && (
                                                      <p className={cx('errorMessage')}>{errors.roleName?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Tình trạng <span className={cx('required')}>*</span>
                                                </p>
                                                <div className={cx('select', 'selectActive')}>
                                                      {/* xài controller nếu sử dụng library UI  link: https://legacy.react-hook-form.com/get-started/#IntegratingwithUIlibraries*/}
                                                      <Controller
                                                            name="active"
                                                            control={control}
                                                            render={({ field }) => (
                                                                  <Select
                                                                        placeholder="Nhập tình trạng"
                                                                        {...field}
                                                                        options={[
                                                                              {
                                                                                    value: false,
                                                                                    label: 'Ngưng hoạt động',
                                                                              },
                                                                              {
                                                                                    value: true,
                                                                                    label: 'Hoạt động',
                                                                              },
                                                                        ]}
                                                                  />
                                                            )}
                                                      />
                                                      <LogoArrow className={cx('logoArrow')} />
                                                </div>
                                                {errors.active?.message && (
                                                      <p className={cx('errorMessage')}>{errors.active?.message}</p>
                                                )}
                                          </div>
                                    </div>
                                    <p className={cx('label')}>
                                          <span className={cx('required')}>*</span>
                                          <span style={{ color: 'var(--color-gray-300)', marginLeft: '10px' }}>
                                                Là trường thông tin bắt buộc
                                          </span>
                                    </p>
                              </div>
                              <div className={cx('wrapper-btn')}>
                                    <button
                                          onClick={() => navigate(-1)}
                                          type="button"
                                          className={cx('btn', 'btn-btnCancel')}
                                    >
                                          Hủy bỏ
                                    </button>
                                    <button type="submit" className={cx('btn', 'btn-btnUpdate')}>
                                          Cập nhật tài khoản
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};
