import { getSiteInfo } from '@/lib/APIs/config-api';
import PopupClient from './popup-client';

type Props = {};

const Popup = async (props: Props) => {
  const { data } = await getSiteInfo();
  const popup = data?.popup?.allow;
  const popupData = data?.popup?.pop_up_data;

  return <PopupClient popup={popup} popupData={popupData} />;
};

export default Popup;
