import React from 'react';
import {Text, View} from 'react-native';
import {developerSettings, helpInfo, settings} from '../constants/profileData';
import {COLORS, styles} from '../styles';
import {Card} from './Card';
import {Icon} from './Icon';
import {Toggle} from './Toggle';

type RowItem = {
  id: number;
  title: string;
  value?: string;
  icon: string;
  success?: boolean;
  warning?: boolean;
  type?: string;
  enabled?: boolean;
};

const DataRow = ({item, last}: {item: RowItem; last: boolean}) => {
  return (
    <View style={[styles.itemRow, last && styles.lastRow]}>
      <View style={styles.rowIcon}>
        <Icon name={item.icon} size={16} />
      </View>
      <View style={styles.itemTextWrap}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      {!!item.value && (
        <Text
          style={[
            styles.itemValue,
            item.success && {color: COLORS.green},
            item.warning && {color: COLORS.orange},
          ]}>
          {item.value}
        </Text>
      )}
      {item.type === 'switch' ? <Toggle enabled={item.enabled} /> : <Icon name="chevron" size={16} />}
    </View>
  );
};

export const DeveloperSettings = () => (
  <Card title="Developer Settings">
    {developerSettings.map((item, index) => (
      <DataRow key={item.id} item={item} last={index === developerSettings.length - 1} />
    ))}
  </Card>
);

export const SettingsCard = () => (
  <Card title="Settings">
    {settings.map((item, index) => (
      <DataRow key={item.id} item={item} last={index === settings.length - 1} />
    ))}
  </Card>
);

export const HelpInfo = () => (
  <Card title="Help & Info">
    {helpInfo.map((item, index) => (
      <DataRow key={item.id} item={item} last={index === helpInfo.length - 1} />
    ))}
  </Card>
);
