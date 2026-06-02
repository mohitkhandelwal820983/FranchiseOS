import React from 'react';
import {Text, View} from 'react-native';
import {Activity, Building2, CalendarDays, Moon, Plus} from 'lucide-react-native';
import {C} from '../constants/dashboardTheme';
import {OverviewItem} from '../constants/dashboardData';
import {s} from '../styles';

type Props = {
  styles: any;
  total: OverviewItem;
  smallCards: OverviewItem[];
};

const PlatformOverview = ({styles, total, smallCards}: Props) => {
  return (
    <>
      <View style={styles.totalCard}>
        <View style={styles.totalIconBox}>
          <Building2 color={C.blue}  size={s(90)} strokeWidth={1.8} />
        </View>
        <OverviewText styles={styles} item={total} total />
      </View>

      <View style={styles.overviewGrid}>
        {smallCards.map(item => (
          <OverviewSmallCard key={item.title} styles={styles} item={item} />
        ))}
      </View>
    </>
  );
};

const OverviewSmallCard = ({styles, item}: {styles: any; item: OverviewItem}) => {
  return (
    <View style={styles.overviewSmallCard}>
      <View style={[styles.overviewIconCircle, {backgroundColor: iconBackground(item.type)}]}>
        {renderIcon(item.type)}
      </View>
      <OverviewText styles={styles} item={item} />
    </View>
  );
};

const OverviewText = ({styles, item, total}: {styles: any; item: OverviewItem; total?: boolean}) => {
  const isGreen = item.type === 'newMonth';
  const isRed = item.type === 'inactive';

  return (
    <View style={total ? styles.totalTextBox : styles.overviewTextBox}>
      <Text style={styles.overviewTitle}>{item.title}</Text>
      <Text style={[styles.overviewValue, total && styles.totalOverviewValue, isGreen && styles.greenText, isRed && styles.redText]}>
        {item.value}
      </Text>
      <Text style={[styles.overviewSub, isGreen && styles.greenText, isRed && styles.redText]}>
        {item.subtitle}
      </Text>
    </View>
  );
};

const iconBackground = (type: OverviewItem['type']) => {
  switch (type) {
    case 'activeToday':
    case 'newMonth':
      return C.softGreen;
    case 'activeMonth':
      return C.softBlue;
    case 'inactive':
      return C.softRed;
    default:
      return 'transparent';
  }
};

const renderIcon = (type: OverviewItem['type']) => {
  switch (type) {
    case 'activeToday':
      return <Activity color={C.green} size={s(42)} strokeWidth={2.8} />;
    case 'activeMonth':
      return <CalendarDays color={C.blue} size={s(42)} strokeWidth={2.6} />;
    case 'newMonth':
      return <Plus color={C.green} size={s(50)} strokeWidth={2.2} />;
    case 'inactive':
      return <Moon color={C.red} fill={C.red} size={s(42)} strokeWidth={2.1} />;
    default:
      return null;
  }
};

export default PlatformOverview;
