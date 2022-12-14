import classNames from 'classnames/bind';
import style from './ResetPassword.module.scss';
import { Logo } from '../../../assets/svg/Logo';
import { GroupPeoplePassword } from '../../../assets/svg/GroupPeoplePassword';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { updatePassword } from '../../../redux/features/UserSlice';
import { UserType } from '../../propsType/UserProps';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);
export const ResetPassword = () => {
      const passwordRef = useRef<any>(null);
      const passwordConfirmRef = useRef<any>(null);
      const errorRef = useRef<HTMLParagraphElement>(null);

      const navigate = useNavigate();
      const location = useLocation();
      const dispatch = useDispatch<any>();

      useEffect(() => {
            if (!location.state?.email) {
                  navigate('/forgotPassword');
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleClickConfirm = () => {
            const password = passwordRef.current?.value;
            const passwordConfirm = passwordConfirmRef.current?.value;

            if (passwordConfirm === password) {
                  dispatch(
                        updatePassword({
                              email: location.state?.email,
                              key: location.state?.key,
                              password: passwordRef.current.value,
                        } as UserType),
                  );
                  toast.success('Cập nhật thành công', { theme: 'dark' });
                  navigate('/');
            } else {
                  errorRef.current?.classList.add(cx('showError'));
            }
      };

      return (
            <div className={cx('wrapper')}>
                  <div className={cx('leftContent')}>
                        <Logo className={cx('logo')} />
                        <div className={cx('form')}>
                              <div>
                                    <p className={cx('heading')}>Đặt lại mật khẩu</p>
                                    <p className={cx('label')}>Mật khẩu *</p>
                                    <input ref={passwordRef} className={cx('input')} type="password" />
                              </div>
                              <div>
                                    <p className={cx('label')}>Nhập lại mật khẩu *</p>
                                    <input ref={passwordConfirmRef} className={cx('input')} type="password" />
                              </div>
                              <p ref={errorRef} className={cx('errorMessage')}>
                                    Hai mật khẩu phải giống nhau
                              </p>
                        </div>
                        <button onClick={handleClickConfirm} className={cx('btnLogin')}>
                              Xác nhận
                        </button>
                  </div>
                  <div className={cx('rightContent')}>
                        <GroupPeoplePassword />
                  </div>
            </div>
      );
};
