import React from 'react';
import { Text, View } from 'react-native';
import { ChevronDown, Eye, Pencil, Trash2 } from 'lucide-react-native';
import { CompanyItem } from '../constants/companiesData';
import { colors, ms, styles } from '../styles';

const statusStyle = (status: CompanyItem['status']) => {
  if (status === 'Active') {
    return { border: '#BFE7C6', background: '#EAF8EC', text: '#0B8E2A' };
  }
  if (status === 'Pending') {
    return { border: '#FDBA8C', background: '#FFF2E8', text: '#EA580C' };
  }
  if (status === 'Suspended') {
    return { border: '#F7A7AE', background: '#FFF2F3', text: '#D71920' };
  }
  return { border: '#D8D8D8', background: '#EFEFEF', text: '#222222' };
};

const dropdownStyle = (status: CompanyItem['status']) => {
  if (status === 'Active') {
    return { border: colors.navy, background: colors.navy, text: '#FFFFFF', arrow: '#FFFFFF' };
  }
  if (status === 'Pending') {
    return { border: '#FF7A2F', background: '#FFFFFF', text: '#EA580C', arrow: '#EA580C' };
  }
  if (status === 'Suspended') {
    return { border: '#FF9AA3', background: '#FFFFFF', text: '#E50914', arrow: '#E50914' };
  }
  return { border: '#B9BDCB', background: '#FFFFFF', text: colors.text, arrow: colors.text };
};

type Props = {
  company: CompanyItem;
};

const CompanyCard = ({ company }: Props) => {
  const pill = statusStyle(company.status);
  const dropdown = dropdownStyle(company.status);
  const isStatBlue = company.status === 'Active' || company.status === 'Suspended' || company.status === 'Inactive';

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={[styles.avatar, { backgroundColor: company.avatarColor }]}>
          <Text style={styles.avatarText}>{company.initials}</Text>
        </View>

        <View style={styles.companyMiddle}>
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.ownerText}>Owner: {company.owner}</Text>
        </View>

        <View style={styles.statusLocation}>
          <View
            style={[
              styles.statusPill,
              { borderColor: pill.border, backgroundColor: pill.background },
            ]}>
            <Text style={[styles.statusPillText, { color: pill.text }]}>{company.status}</Text>
          </View>
          <Text style={styles.locationText}>{company.location}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statText, isStatBlue && styles.statBlue]}>{company.franchises}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statText, company.status === 'Active' && styles.statGreen, company.status === 'Suspended' && styles.statBlue]}>
            {company.revenue}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statText}>{company.added}</Text>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.actionRow}>
        <View style={styles.bottomLeft}>
          <Text style={styles.changeStatusText}>Change Status:</Text>
          <View
            style={[
              styles.dropdown,
              { borderColor: dropdown.border, backgroundColor: dropdown.background },
            ]}>
            <Text style={[styles.dropdownText, { color: dropdown.text }]}>{company.status}</Text>
            <ChevronDown size={ms(12)} color={dropdown.arrow} strokeWidth={2.3} />
          </View>
        </View>

        <View style={styles.actionIcons}>
          <View style={styles.iconButton}>
            <Eye size={ms(17)} color="#252543" strokeWidth={2.2} />
          </View>
          <View style={styles.iconButton}>
            <Pencil size={ms(17)} color="#252543" strokeWidth={2.2} />
          </View>
          <View style={styles.iconButton}>
            <Trash2 size={ms(17)} color="#EF1B24" strokeWidth={2.2} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompanyCard;
