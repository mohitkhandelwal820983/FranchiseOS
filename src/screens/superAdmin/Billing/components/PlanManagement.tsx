import React from 'react';
import {Text, View} from 'react-native';
import {Edit3} from 'lucide-react-native';
import {plans} from '../constants/billingData';
import {styles} from '../styles';

export const PlanManagement = () => {
  return (
    <View style={styles.halfCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Plan Management</Text>
        <Text style={styles.headerLink}>Manage Plans</Text>
      </View>
      {plans.map(plan => (
        <View key={plan.name} style={styles.planRow}>
          <View style={[styles.planBadge, {backgroundColor: plan.color}]}>
            <Text style={styles.planBadgeText}>{plan.name}</Text>
          </View>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planCompanies}>{plan.companies}</Text>
          <Edit3 color="#11142A" size={15} strokeWidth={2.2} />
        </View>
      ))}
      <Text style={styles.createPlan}>＋ Create New Plan</Text>
    </View>
  );
};
