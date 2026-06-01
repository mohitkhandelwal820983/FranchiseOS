import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {styles} from './styles';
import {ProfileHeader} from './components/ProfileHeader';
import {ProfileHero} from './components/ProfileHero';
import {AdminDetails} from './components/AdminDetails';
import {PlatformLogo} from './components/PlatformLogo';
import {AccountSecurity} from './components/AccountSecurity';
import {RecentLogins} from './components/RecentLogins';
import {SecurityAlerts} from './components/SecurityAlerts';
import {PlatformControls} from './components/PlatformControls';
import {OtherAdmins} from './components/OtherAdmins';
import {DeveloperSettings, HelpInfo, SettingsCard} from './components/SimpleListCard';
import {Announcements} from './components/Announcements';
import {LogoutSection} from './components/LogoutSection';

const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#001F63" />
      <ProfileHeader />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ProfileHero />

        <View style={styles.grid}>
          <AdminDetails />
          <PlatformLogo />
          <AccountSecurity />
          <View style={{width: '49%'}}>
            <RecentLogins />
            <SecurityAlerts />
          </View>
          <PlatformControls />
          <OtherAdmins />
          <DeveloperSettings />
          <Announcements />
          <SettingsCard />
          <HelpInfo />
        </View>

        <LogoutSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
