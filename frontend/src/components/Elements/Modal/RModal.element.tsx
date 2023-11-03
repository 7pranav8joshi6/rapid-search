import { Modal, Spin } from "antd";
import { ReactNode } from "react";

type RModalProps = {
  open: boolean;
  children: ReactNode;
  closeIcons?: boolean;
  footer?: ReactNode;
  loading?: boolean;
  onClose?: (e: any) => void;
};

const RModal = ({
  open,
  children,
  footer,
  loading,
  onClose,
  closeIcons,
}: RModalProps) => {
  return (
    <Spin spinning={loading}>
      <Modal
        open={open}
        onCancel={onClose}
        closeIcon={closeIcons ?? false}
        footer={footer ?? false}
        title={"SUBSCRIPTION PLANS"}
        children={children}
        width={900}
        maskClosable={false}
      />
    </Spin>
  );
};

export default RModal;
