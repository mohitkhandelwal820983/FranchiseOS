import React, { useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native'; // 1. Added TouchableOpacity
import { commonStyle } from '../common/CommonStyle';
import { colors } from '../common/Colors';
import { ArrowLeft, Phone } from 'lucide-react-native'; // 2. Imported back arrow icon
import { CustomInput } from '../common/CustomInput';
import { CustomButton } from '../common/CustomButton';

const { width } = Dimensions.get('window');

// Pass navigation down if using React Navigation (e.g., ({ navigation }))
const ForgotPassword = () => {
  const [emailOrMobile, setEmialOrMobile] = useState('');
  const [isOtpSend, setOtpSend] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const otpInputRef = useRef<TextInput>(null);
  const maximumCodeLength = 6;
  const handleSendOtp = () => {};
  const handleVerifyOtp = () => {
   
  };

  // Maps the 6 visual input slots cleanly
  const boxArray = new Array(maximumCodeLength).fill(0);

  const renderOtpBox = (_: any, index: number) => {
    const digit = otpCode[index] || '';
    const isCurrentDigit = index === otpCode.length;
    const isLastDigit = index === maximumCodeLength - 1;
    const isCodeFull = otpCode.length === maximumCodeLength;

    // Highlights the active box border color dynamically
    const isFocusedBox = isCurrentDigit || (isLastDigit && isCodeFull);

    return (
      <View
        key={index}
        style={{
          borderColor: isFocusedBox ? (colors.primary || '#007AFF') : (colors.border || '#E0E0E0'),
          borderWidth: isFocusedBox ? 2 : 1,
          width: 45,
          height: 50,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Text style={[commonStyle.semiBold, { fontSize: 18, color: colors.black || '#000000' }]}>
          {digit}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {/* Header Wrapper Container */}
      <View
        style={{
          width: width,
          height: 140,
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        {/* The Decreased/Flatter Curve View */}
        <View
          style={{
            backgroundColor: colors.primary,
            width: width * 2.1,
            height: 400,
            position: 'absolute',
            top: -290,
            borderBottomEndRadius: width * 1.2,
            borderBottomStartRadius: width * 1.2,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 20,
          }}
        >
          
          <View
            style={{
              width: width, 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16, 
            }}
          >
           
            <TouchableOpacity
              onPress={() => console.log('Go back pressed')} 
              activeOpacity={0.7}
              style={{
                position: 'absolute',
                left: 20,
                bottom: 25,
              }}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>

            
            <Text
              style={[commonStyle.semiBold, { fontSize: 24, color: '#FFFFFF' }]}
            >
              FranchiseOS
            </Text>
          </View>
        </View>
      </View>

    
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={[commonStyle.semiBold, { fontSize: 30, color: colors.black }]}
        >
          Forgot Password?
        </Text>
        <Text
          style={[
            commonStyle.medium,
            {
              fontSize: 16,
              color: colors.textGray || '#666',
              marginTop: 8,
              textAlign: 'center',
            },
          ]}
        >
          Enter your registered mobile number or email and we will send you an
          OTP
        </Text>
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <CustomInput
          placeholder="Mobile Number or Email"
          value={emailOrMobile}
          onChangeText={setEmialOrMobile}
          keyboardType="email-address"
          autoCapitalize="none"
          extraStyle={{ marginTop: 16 }}
          StartIcon={Phone}
        />

        <CustomButton
          title="Send OTP"
          textStyle={[commonStyle.medium]}
          onPress={handleSendOtp}
          isLoading={isOtpSend} 
          extraStyle={{ marginTop: 24 }}
          bgColor={colors.lightBlue}
        />
      </View>


      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView bounces={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 40, flexGrow: 1 }}>
          
            <View style={{ width: '100%', alignItems: 'center' }}>
              
              {/* Invisible input overlay that processes all natural typing loops natively */}
              <TextInput
                ref={otpInputRef}
                value={otpCode}
                onChangeText={(text) => setOtpCode(text.replace(/[^0-9]/g, ''))} // Restricts to digits only
                maxLength={maximumCodeLength}
                keyboardType="number-pad"
                textContentType="oneTimeCode" // Enables iOS Autofill from SMS
                style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
              />

              {/* Clickable visual layer layout mapping */}
              <TouchableOpacity 
                activeOpacity={1} 
                onPress={() => otpInputRef.current?.focus()}
                style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  width: '100%', 
                  paddingHorizontal: 4,
                  marginTop: 8
                }}
              >
                {boxArray.map(renderOtpBox)}
              </TouchableOpacity>

             <View style={{justifyContent:'space-between',flexDirection:'row',width:"100%",marginTop:8}}>
                 <Text style={[commonStyle.medium,{color:colors.textGray,fontSize:16}]}>Resend OTP in 0:45</Text>
              <Text style={[commonStyle.medium,{color:colors.textGray,fontSize:16}]}>Resend OTP</Text>
             </View>


              <CustomButton
                title="Verify OTP"
                textStyle={[commonStyle.medium]}
                onPress={handleVerifyOtp}
                extraStyle={{ marginTop: 32 }}
                bgColor={colors.lightBlue}
              />

              <TouchableOpacity style={{ marginTop: 24 }} onPress={handleSendOtp}>
                <Text style={[commonStyle.semiBold, { color: colors.textGray, fontSize: 16 }]}>
                 Remember password? Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
