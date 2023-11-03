import styles from "./login.module.scss";
import loginImage from "../../assets/Playlist-amico.svg";
import RInput from "../../components/Elements/Input/RInput.component";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import { UserLoginDTO } from "../../Model/userDetails.model";
import authService from "../../service/auth.service";
import { useSetRecoilState } from "recoil";
import { AtomToken } from "../../store/global.store";
import { setToken } from "../../helper/localStorage.helper";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState<UserLoginDTO>({} as UserLoginDTO);
  const setTokenAtom = useSetRecoilState(AtomToken);
  const { LoginService } = authService();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    LoginService({
      userLogin,
      setToken,
      setTokenAtom,
    });
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />

      <div className={styles.leftSection}>
        <img
          className={styles.image}
          src={loginImage}
          alt="loginImage"
          width={600}
          height={600}
        />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.heading}>Login here</div>
        <div className={styles.inputSection}>
          <RInput
            name="email"
            value={userLogin.email}
            label="Email"
            onChange={handleChange}
          />
          <RInput
            name="password"
            value={userLogin.password}
            label="Password"
            onChange={handleChange}
          />
        </div>

        <div className={styles.already}>
          <Link to={"/signUp"}>Don't have an account?? sign up Here</Link>
        </div>

        <Button type="primary" onClick={onSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
