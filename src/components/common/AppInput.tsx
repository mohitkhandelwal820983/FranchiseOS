import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Eye, EyeOff, Lock, Person, User } from 'lucide-react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  'person-outline': Person,
  person: Person,
  user: User,
  'lock-closed-outline': Lock,
  lock: Lock,
  'eye-outline': Eye,
  eye: Eye,
  'eye-off-outline': EyeOff,
  'eye-off': EyeOff,
};

const AppInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
}: Props) => {
  const LeftIcon = leftIcon ? ICON_MAP[leftIcon] || Person : Person;
  const RightIcon = rightIcon ? ICON_MAP[rightIcon] : null;

  return (
    <View style={styles.container}>
      {LeftIcon && <LeftIcon size={22} color="#6B7280" />}

      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />

      {RightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <RightIcon size={24} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
});