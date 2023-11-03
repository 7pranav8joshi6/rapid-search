import styles from "./signUp.module.scss";
import loginImage from "../../assets/Playlist-amico.svg";
import { Button } from "antd";
import RInput from "../../components/Elements/Input/RInput.component";
import { ChangeEvent, useState } from "react";
import { UserDetailDTO } from "../../Model/userDetails.model";
import { Link } from "react-router-dom";
import authService from "../../service/auth.service";
import { ToastContainer } from "react-toastify";

const SignUpPage = () => {
  const [user, setUser] = useState<UserDetailDTO>({} as UserDetailDTO);
  const { RegisterCustomer } = authService();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    RegisterCustomer({ user, setUser });
  };

  return (
    <div className={styles.wrapper}>
      <ToastContainer />

      <div className={styles.leftSection}>
        <img
          className={styles.image}
          src={loginImage}
          alt="login"
          width={600}
          height={600}
        />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.heading}>Register here</div>
        <div className={styles.inputSection}>
          <RInput
            name="name"
            value={user.name}
            label="Name"
            onChange={handleChange}
          />
          <RInput
            name="email"
            value={user.email}
            label="Email"
            onChange={handleChange}
            type="email"
          />

          <RInput
            name="password"
            value={user.password}
            label="Password"
            onChange={handleChange}
            type="password"
          />
        </div>

        <div className={styles.already}>
          <Link to={"/login"}>Already Have an Account?? Login here</Link>
        </div>

        <Button type="primary" onClick={handleSubmit}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
