import { Text, View } from 'react-native';
import { colors } from '../common/Colors';
import { commonStyle } from '../common/CommonStyle';
import { useState } from 'react';
import { CustomInput } from '../common/CustomInput';
import { Mail,Eye,EyeOff } from 'lucide-react-native';
import { CustomButton } from '../common/CustomButton';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = () => {
    setIsLoggingIn(true);
    
    // Simulating a 2-second backend authentication endpoint request
    setTimeout(() => {
      setIsLoggingIn(false);
     
    }, 2000);
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={[commonStyle.semiBold, { fontSize: 24 }]}>
          FranchiseOS
        </Text>
      </View>
      
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -30,
          paddingTop: 30,
          paddingHorizontal: 24,
          flex: 0.5,
        }}
      >
        <Text
          style={[commonStyle.semiBold, { fontSize: 22, color: colors.black }]}
        >
          Welcome Back
        </Text>

       <CustomInput
          placeholder="Email or Phone Number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          extraStyle={{ marginTop: 16 }}
          StartIcon={Mail}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          extraStyle={{ marginTop: 16 }} 
          EndIcon={showPassword ? Eye : EyeOff} 
          onEndIconPress={() => setShowPassword(!showPassword)}
        />

        <Text style={[commonStyle.semiBold, { color: colors.lightBlue, marginTop: 16 ,alignSelf:'flex-end'}]}>
          Forgot Password?
        </Text>

        <CustomButton
          title="Login"
          textStyle={[commonStyle.medium]}
          onPress={handleLoginSubmit}
          isLoading={isLoggingIn}         // Spinner activates automatically when active
          extraStyle={{ marginTop: 24 }} // Controls separation context from password input row
          bgColor={colors.lightBlue}
        />

        <View style={{width:"100%",height:1,backgroundColor:colors.greyLine,marginTop:16}}/>
        <Text style={[commonStyle.medium,{color:colors.textGray,alignSelf:'center',marginTop:8}]}>First time? Contact your admin</Text>

      </View>
    </View>
  );
};

export default LoginScreen;
