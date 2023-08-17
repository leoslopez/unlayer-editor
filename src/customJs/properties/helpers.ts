import { EMPTY_SELECTION } from '../constants';
import { $t } from '../localization';
import { Image, Store, UnlayerProperty } from '../types';

const createOptions = <TValue extends string>(
  items: { value: TValue; label: string }[],
) => {
  const defaultValue = items.length === 1 ? items[0].value : EMPTY_SELECTION;
  const emptyOption = {
    value: EMPTY_SELECTION,
    label: $t('_dp.select_option'),
  } as const;
  const options = [emptyOption, ...items] as [
    { value: TValue | EMPTY_SELECTION; label: string },
    ...{ value: TValue | EMPTY_SELECTION; label: string }[],
  ];
  return [options, defaultValue] as const;
};

export const mappedDropdownProperty = <TInputItem, TValue extends string>({
  label,
  items,
  map,
}: Readonly<{
  label: string;
  items: Readonly<TInputItem[]>;
  map: (item: TInputItem) => { value: TValue; label: string };
}>) => {
  const mappedItems = items.map(map);
  const [options, defaultValue] = createOptions(mappedItems);
  return dropdownProperty({
    label,
    options,
    defaultValue,
  });
};

export const dropdownProperty = <TValue extends string>({
  label,
  options,
  defaultValue,
}: Readonly<{
  label: string | undefined;
  options: Readonly<
    [{ value: TValue; label: string }, ...{ value: TValue; label: string }[]]
  >;
  defaultValue?: TValue;
}>) =>
  ({
    label,
    defaultValue: defaultValue ?? options[0].value,
    widget: 'dropdown',
    data: {
      options,
    },
  }) as const;

export const smallBigDropdownProperty = ({
  label,
  defaultValue,
}: {
  label: string | undefined;
  defaultValue?: 'small' | 'big';
}) =>
  dropdownProperty({
    label,
    defaultValue,
    options: [
      {
        label: $t('_dp.small'),
        value: 'small',
      },
      { label: $t('_dp.big'), value: 'big' },
    ] as const,
  });

export const smallMediumLargeDropdownProperty = ({
  label,
  defaultValue,
}: {
  label: string | undefined;
  defaultValue?: 'small' | 'medium' | 'large';
}) =>
  dropdownProperty({
    label,
    defaultValue,
    options: [
      {
        label: $t('_dp.small'),
        value: 'small',
      },
      {
        label: $t('_dp.medium'),
        value: 'medium',
      },
      { label: $t('_dp.big'), value: 'large' },
    ] as const,
  });

export const alignmentProperty = () => ({
  label: $t('editor.align.label'),
  defaultValue: 'center' as const,
  widget: 'alignment',
});

export const toggleProperty: ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: boolean;
}) => UnlayerProperty<boolean> = ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: boolean;
}) => ({
  label,
  defaultValue,
  widget: 'toggle',
});

export const toggleShowProperty: (param?: {
  defaultValue: boolean;
}) => UnlayerProperty<boolean> = ({
  defaultValue = true,
}: {
  defaultValue?: boolean;
} = {}) => ({
  label: $t('_dp.show'),
  defaultValue,
  widget: 'toggle',
});

export const imageProperty: ({
  label,
}: {
  label: string;
}) => UnlayerProperty<Image> = ({ label }: { label: string }) => ({
  label,
  widget: 'image',
});

export const textProperty: ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) => UnlayerProperty<string> = ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) => ({
  label,
  defaultValue,
  widget: 'text',
});

export const storesDropdownProperty = ({ stores }: { stores: Store[] }) =>
  mappedDropdownProperty({
    label: $t('_dp.store'),
    items: stores,
    map: ({ name }) => ({
      value: name,
      label: name,
    }),
  });
