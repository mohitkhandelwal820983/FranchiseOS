import React from 'react';
import {Text, View} from 'react-native';
import {otherAdmins} from '../constants/profileData';
import {styles} from '../styles';
import {Card} from './Card';

export const OtherAdmins = () => {
  return (
    <Card title="Other Admins">
      {otherAdmins.map(admin => (
        <View key={admin.id} style={styles.adminRow}>
          <View style={styles.miniAvatar}>
            <Text style={styles.miniAvatarText}>{admin.initials}</Text>
          </View>
          <View style={styles.itemTextWrap}>
            <Text style={styles.adminName}>{admin.name}</Text>
            <Text style={styles.adminRole}>{admin.role}</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>{admin.status}</Text>
          </View>
          <View style={styles.manageBtn}>
            <Text style={styles.manageText}>Manage</Text>
          </View>
        </View>
      ))}
      <View style={[styles.adminRow, styles.lastRow]}>
        <View style={[styles.miniAvatar, styles.addAvatar]}>
          <Text style={styles.addText}>+</Text>
        </View>
        <View style={styles.itemTextWrap}>
          <Text style={[styles.adminName, {color: '#003BFF'}]}>Add Backup Admin</Text>
          <Text style={styles.itemSubtitle}>Invite another super admin</Text>
        </View>
      </View>
    </Card>
  );
};
