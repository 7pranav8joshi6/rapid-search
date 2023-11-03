import { Button, Card } from "antd";
import { SubscriptionDTO, UserDetailDTO } from "../../Model/userDetails.model";
import RModal from "../Elements/Modal/RModal.element";
import styles from "./subsciptionModal.module.scss";
import { useResetRecoilState } from "recoil";
import { AtomLoggedUser } from "../../store/auth.store";
import authService from "../../service/auth.service";

type Props = {
  open: boolean;
  loading: boolean;
  handleCardClick: (e: SubscriptionDTO) => void;
  subscriptions: SubscriptionDTO[];
  closeIcon: boolean;
  onClose: (e: any) => void;
  loggedUser: UserDetailDTO;
};

const SubscriptionModal = ({
  handleCardClick,
  loading,
  open,
  closeIcon,
  subscriptions,
  onClose,
  loggedUser,
}: Props) => {
  const resetUser = useResetRecoilState(AtomLoggedUser);
  const { LogoutService } = authService();

  return (
    <>
      <RModal
        open={open}
        loading={loading}
        closeIcons={closeIcon}
        onClose={onClose}
      >
        <div className={styles.cardWrapper}>
          {subscriptions.map((x: SubscriptionDTO, key: number) => {
            return (
              <Card
                title={x.subscriptionName}
                size="small"
                onClick={() => handleCardClick(x)}
                className={styles.cardClass}
                hoverable
                key={key}
              >
                <div>
                  <span className={styles.heading}>Price :</span> {x.price}
                </div>
                <div>
                  <span className={styles.heading}> Search Allowed</span> :
                  {x.usageLimit ? x.usageLimit : "Unlimited Search"}
                </div>
              </Card>
            );
          })}
        </div>

        {!loggedUser.isSubscribed || loggedUser.searchCount === 0 ? (
          <div className={styles.logoutText}>
            <span> If you don't Want to continue , you can logout here </span>

            <Button type="primary" onClick={() => LogoutService({ resetUser })}>
              Log out
            </Button>
          </div>
        ) : (
          ""
        )}
      </RModal>
    </>
  );
};

export default SubscriptionModal;
