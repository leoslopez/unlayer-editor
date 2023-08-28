import { EMPTY_SELECTION } from '../constants';
import { $t } from '../localization';
import {
  AutoWidth,
  Border,
  BorderRadius,
  ButtonColors,
  Color,
  FontFamily,
  FontWeight,
  Image,
  PixelSize,
  Store,
  UnlayerProperty,
} from '../types';

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

export const fontFamilyProperty: (param?: {
  label?: string;
}) => UnlayerProperty<FontFamily> = ({
  label,
}: {
  label?: string;
} = {}) => ({
  label: label ?? $t('editor.font_family.label'),
  widget: 'font_family',
});

export const fontWeightProperty: (param?: {
  label?: string;
}) => UnlayerProperty<FontWeight> = ({
  label,
}: {
  label?: string;
} = {}) => ({
  label: label ?? $t('editor.font_weight.label'),
  widget: 'font_weight',
});

export const fontSizeProperty: (param?: {
  label?: string;
}) => UnlayerProperty<PixelSize> = ({
  label,
}: {
  label?: string;
} = {}) => ({
  label: label ?? $t('editor.font_size.label'),
  widget: 'font_size',
});

export const colorProperty: (param?: {
  label?: string;
}) => UnlayerProperty<Color> = ({
  label,
}: {
  label?: string;
} = {}) => ({
  label: label ?? $t('editor.color.label'),
  widget: 'color_picker',
});

export const buttonColorsProperty: () => UnlayerProperty<ButtonColors> =
  () => ({
    defaultValue: {
      color: '#FFFFFF',
      backgroundColor: '#3AAEE0',
    },
    widget: 'button_color',
  });

export const autoWidthProperty: () => UnlayerProperty<AutoWidth> = () => ({
  defaultValue: { autoWidth: true, width: '100%' },
  widget: 'auto_width',
});

export const borderProperty: () => UnlayerProperty<Border> = () => ({
  label: $t('editor.border.label'),
  defaultValue: {
    borderTopWidth: '0px',
    borderTopStyle: 'solid',
    borderTopColor: '#CCCCCC',
    borderLeftWidth: '0px',
    borderLeftStyle: 'solid',
    borderLeftColor: '#CCCCCC',
    borderRightWidth: '0px',
    borderRightStyle: 'solid',
    borderRightColor: '#CCCCCC',
    borderBottomWidth: '0px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#CCCCCC',
  },
  widget: 'border',
});

export const borderRadiusProperty: () => UnlayerProperty<BorderRadius> =
  () => ({
    label: $t('editor.rounded_border.label'),
    defaultValue: '4px',
    widget: 'border_radius',
  });

export const richTextProperty: (param?: {
  label?: string;
  defaultValue?: string;
}) => UnlayerProperty<string> = ({
  label,
  defaultValue = '',
}: {
  label?: string;
  defaultValue?: string;
} = {}) => ({
  label,
  defaultValue,
  widget: 'rich_text',
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