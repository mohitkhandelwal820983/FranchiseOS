import { TextStyle,ViewStyle } from 'react-native';

export const commonStyle = {
  // Bold Font Style
  bold: {
    fontFamily: 'PoppinsBold', // Make sure this matches your exact linked filename
    fontWeight: 'bold',         // Needed as a fallback/iOS configuration
    color: '#FFFFFF',           // Your global default text color
  } as TextStyle,

  // Semi-Bold Font Style
  semiBold: {
    fontFamily: 'PoppinsSemiBold', // Make sure this matches your exact linked filename
    fontWeight: '600',
    color: '#FFFFFF',
  } as TextStyle,

  medium: {
    fontFamily: 'PoppinsMedium',   // Added: Matches your current project naming architecture
    fontWeight: '500',             // Native 500 mapping for numeric medium weights
    color: '#FFFFFF',
  } as TextStyle,

  // Regular Font Style
  regular: {
    fontFamily: 'PoppinsRegular', // Make sure this matches your exact linked filename
    fontWeight: 'normal',
    color: '#FFFFFF',
  } as TextStyle,
  shadow: {
     shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    backgroundColor:'white',

    // Android Shadow
    elevation: 5,
  } as ViewStyle,
  
};