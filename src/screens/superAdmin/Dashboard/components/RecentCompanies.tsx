import React from 'react';
import {Text, View} from 'react-native';
import {ChevronRight, MapPin} from 'lucide-react-native';
import {RecentCompany} from '../constants/dashboardData';
import {C} from '../constants/dashboardTheme';
import {s} from '../styles';

type Props = {
  styles: any;
  companies: RecentCompany[];
};

const RecentCompanies = ({styles, companies}: Props) => {
  return (
    <>
      {companies.map(company => (
        <CompanyRow key={company.name} styles={styles} company={company} />
      ))}
    </>
  );
};

const CompanyRow = ({styles, company}: {styles: any; company: RecentCompany}) => {
  const active = company.status === 'Active';

  return (
    <View style={styles.companyCard}>
      <View style={[styles.companyAvatar, {backgroundColor: company.color}]}>
        <Text style={styles.companyAvatarText}>{company.initials}</Text>
      </View>

      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{company.name}</Text>
        <Text style={styles.companyOwner}>{company.owner}</Text>
        <View style={styles.locationRow}>
          <MapPin color={C.muted} fill={C.muted} size={s(14)} strokeWidth={2.2} />
          <Text style={styles.companyLocation}>{company.location}</Text>
        </View>
      </View>

      <View style={styles.companyRight}>
        <View style={[styles.statusPill, {backgroundColor: active ? C.softGreen : '#FFF2E8', borderColor: active ? '#BEE8C7' : '#FFD7BD'}]}>
          <Text style={[styles.statusText, {color: active ? C.green : '#F45B00'}]}>{company.status}</Text>
        </View>
        <Text style={styles.planText}>Plan: {company.plan}</Text>
        <Text style={styles.addedText}>{company.added}</Text>
      </View>

      <ChevronRight color="#33364B" size={s(30)} strokeWidth={2.1} />
    </View>
  );
};

export default RecentCompanies;
