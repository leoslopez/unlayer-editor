import { React, useEffect, useState } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { PromoCodesValue, StoreDependentToolValues } from './types';
import { EMPTY_SELECTION } from '../../constants';
import { addUnlayerLabel } from '../../components/UnlayerLabel';
import { getPromoCodes } from '../../utils/dopplerAppBridge';

type CodeOption = { value: string; label: string };

let lastRequestId = 0;
const getRequestId = () => lastRequestId++;

export const PromoCodesWidget: WidgetComponent<
  PromoCodesValue,
  StoreDependentToolValues
> = addUnlayerLabel(({ value, updateValue, values: { store } }) => {
  const [loading, setLoading] = useState(false);
  const [codeOptions, setCodeOptions] = useState<CodeOption[]>([]);

  useEffect(() => {
    if (store === EMPTY_SELECTION) {
      setLoading(false);
      setCodeOptions([]);
      return;
    }

    setLoading(true);

    const requestId = getRequestId();
    const getPromoCodesResponseListener = (message: any) => {
      if (
        message.data.isResponse === true &&
        requestId === message.data.requestId
      ) {
        setCodeOptions(message.data.value);
        setLoading(false);
      }
    };
    getPromoCodes(requestId, store, getPromoCodesResponseListener);

    return () => {
      window.removeEventListener('message', getPromoCodesResponseListener);
    };
  }, [store]);

  // TODO: show a spinner or something
  if (loading) {
    return <div>LOADING...</div>;
  }

  // TODO: show the options as radio buttons
  return (
    <ul>
      {codeOptions.map((x) => (
        <li key={x.value} onClick={() => updateValue(x.value)}>
          {x.value === value ? '[x]' : '[ ]'} {x.label}
        </li>
      ))}
    </ul>
  );
});
