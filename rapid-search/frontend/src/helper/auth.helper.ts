import { UserDetailDTO } from "../Model/userDetails.model";

export const isSubHelper = (
  loggedUser: UserDetailDTO,
  setLoading: (e: boolean) => void
) => {
  const _isSubscribed = loggedUser?.isSubscribed;
  const _isCount = loggedUser?.searchCount > 0;

  setLoading(true);
  if (_isSubscribed || _isCount) {
    setLoading(false);

    return false;
  } else {
    setLoading(false);
    return true;
  }
};
