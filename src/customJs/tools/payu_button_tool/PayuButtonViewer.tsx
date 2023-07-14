import { React } from '../../unlayer-react';
import { intl } from '../../localization';
import { PayuButtonValues } from './PayuButtonValues';
import { ViewerComponent } from '../../types';

export const PayuButtonViewer: ViewerComponent<PayuButtonValues> = ({
  values: { size, paymentURL, alignment },
}) => {
  const buttonImgWidth = size === 'small' ? 116 : size === 'medium' ? 145 : 182;

  return (
    <div style={{ textAlign: alignment }} role="container">
      <a
        role="link"
        href={paymentURL ? paymentURL : '#'}
        target="_blank"
        rel="noreferrer"
      >
        <img
          style={{ width: buttonImgWidth }}
          src={`${intl.formatMessage({ id: `_dp.payu_${size}_button` })}`}
          alt="payu_button"
        />
      </a>
    </div>
  );
};