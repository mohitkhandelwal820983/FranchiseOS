import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/**
 * IMPORTANT:
 * This design width is taken from the old Company Dashboard / Orders / Profile / Dealer Dashboard / Dealer Orders / Dealer Customer files.
 * Keep it 832 if you want the exact same font size and spacing as the old UI.
 */
const DESIGN_WIDTH = 832;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;

/** Same as old rs(value) for 832-based screens */
export const size = (value: number) => Math.round(value * scale);

/** Same as old fs(value): rs(value + 3) */
export const textSize = (value: number) => size(value + 3);
/** Super Admin Dashboard style file used old fs(value): Math.max(9, Math.round(value * scale * 1.08)) */
export const dashboardTextSize = (value: number) => Math.max(9, Math.round(size(value) * 1.08));


/** Stockist Profile screen used old fs(value): rs(value + 5) */
export const stockistProfileTextSize = (value: number) => size(value + 5);

/** Super Admin screens using old fs(value): rs(value + 5) */
export const superAdminTextSize = (value: number) => size(value + 5);

/** Super Admin Profile screen used old fs(value): Math.round((value + 6) * scale) */
export const superAdminProfileTextSize = (value: number) => size(value + 6);

/** Finance screen used old fs(value): rs(value + 2) */
export const financeTextSize = (value: number) => size(value + 2);

/** Network list screen used a different old design width: 928 */
const NETWORK_DESIGN_WIDTH = 928;
const networkScale = SCREEN_WIDTH / NETWORK_DESIGN_WIDTH;

/** Same as old rs(value) for Network list screen */
export const networkSize = (value: number) => Math.round(value * networkScale);

/** Same as old fs(value): rs(value + 3) for Network list screen */
export const networkTextSize = (value: number) => networkSize(value + 3);

/** Place New Order screen used old mobile design width: 390 */
const MOBILE_DESIGN_WIDTH = 390;
const mobileScale = SCREEN_WIDTH / MOBILE_DESIGN_WIDTH;

/** Same as old rs(value) for 390-based mobile screens */
export const mobileSize = (value: number) => Math.round(value * mobileScale);

/** Same as old fs(value): rs(value + 3) for 390-based mobile screens */
export const mobileTextSize = (value: number) => mobileSize(value + 3);

/** Forgot Password screen used old design width: 263 */
const FORGOT_PASSWORD_DESIGN_WIDTH = 263;
const forgotPasswordScale = SCREEN_WIDTH / FORGOT_PASSWORD_DESIGN_WIDTH;
export const forgotPasswordSize = (value: number) => Math.round(value * forgotPasswordScale);


export const fontScale = {
  global: 1,
  heading: 1,
  subheading: 1,
  body: 1,
  small: 1,
  button: 1,
};

export const fonts = {
  regular: "PoppinsRegular",
  medium: "PoppinsMedium",
  semiBold: "PoppinsSemiBold",
  bold: "PoppinsBold",
  extraBold: "PoppinsExtraBold",
};

/** Optional named font sizes mapped to old dashboard fs() values. */
export const fontSize = {
  heading: textSize(29 * fontScale.heading * fontScale.global),
  subheading: textSize(20 * fontScale.subheading * fontScale.global),
  title: textSize(18 * fontScale.heading * fontScale.global),
  body: textSize(15 * fontScale.body * fontScale.global),
  small: textSize(13 * fontScale.small * fontScale.global),
  tiny: textSize(11 * fontScale.small * fontScale.global),
  button: textSize(14 * fontScale.button * fontScale.global),
};

export const colors = {
  primary: "#061B66",
  primaryText: "#061247",
  secondary: "#1557F5",
  financeBlue: "#173CFF",
  brightBlue: "#0074F6",
  approvedText: "#006BCF",
  linkBlue: "#001DDE",

  background: "#F7F8FC",
  financeBackground: "#F8F9FD",

  white: "#FFFFFF",
  black: "#000000",

  text: "#111327",
  inputText: "#111737",
  darkSlate: "#222640",
  labelDark: "#2E314A",
  mutedText: "#55576F",
  slateText: "#5D607E",
  placeholderText: "#555B7C",
  iconMuted: "#6B6D8A",

  success: "#138A36",
  successDark: "#006D1D",
  successDeep: "#087A22",
  greenIcon: "#008D21",
  checkGreen: "#0A8A26",

  danger: "#EA1111",
  dangerDark: "#E00014",
  dangerDeep: "#D90014",
  notificationRed: "#E60012",

  warning: "#F97316",
  warningDark: "#E75200",
  profileOrange: "#F06419",

  profilePlanBlue: "#073DD4",
  purple: "#7B22EA",
  activeGreen: "#0AB72B",

  dealerBlueSoft: "#EEF3FF",
  dealerProgressTrack: "#E4E6EF",

  border: "#EDEFF5",
  divider: "#EEEFF4",
  inputBorder: "#D9DCE8",
  lightBorder: "#E0E3EE",
  cardBorder: "#EAECF3",
  financeDivider: "#EEF0F6",
  progressTrack: "#E5E7EF",
  progressTrackDark: "#E3E4EA",
  progressTrackAlt: "#E3E5EC",

  summaryBlueBorder: "#CEDBFF",
  summaryGreenBorder: "#D7E9D9",

  successBorder: "#BEE7C5",
  successLight: "#EAF8EC",

  blueSoft: "#F3F6FF",
  blueBorderSoft: "#B8C8FF",
  approvedLight: "#EEF7FF",
  approvedBorder: "#B6D8FF",

  dangerLight: "#FFF0F0",
  dangerBorder: "#FFB6B6",

  // Dealer Orders screen extras
  purpleSoft: "#F7F0FF",
  orangeSoft: "#FFF3E9",
  blueLight: "#F1F5FF",
  greenBorder: "#88C99A",
  orangeBorder: "#F8C9A8",

  // Dealer Customer screen extras
  customerAvatarBlueSoft: "#EEF3FF",
  customerAvatarGreen: "#138A36",
  customerAvatarOrange: "#F06419",
  customerMetricGreenSoft: "#138A3614",
  customerMetricBlueSoft: "#173CFF14",
  customerMetricPurpleSoft: "#7B22EA14",
  customerMetricOrangeSoft: "#F0641914",
  customerOutstandingBg: "#FFF3E9",
  customerAchievementBg: "#F1F5FF",

  // Stockist screens extras
  stockistPriorityBorder: "#8CA3FF",
  stockistInputBorder: "#DCE0EA",
  stockistOrangeSoft: "#FFF1E7",
  stockistImageBg: "#F2F3F8",
  stockistWarningBg: "#FFF6EF",
  stockistDangerSoft: "#FFF5F5",
  stockistPurpleBorder: "#D8B8FF",
  stockistPurpleSoft: "#F8F1FF",
  stockistPanelBg: "#F7F7FA",

  // Stockist Orders screen extras
  stockistAiBorder: "#E3CCFF",
  stockistTimelineGrey: "#8A8CA0",
  stockistOrangeTextDark: "#A34900",

  // Stockist Dealer screen extras
  stockistRequestAvatarBg: "#EEF2FF",
  stockistPendingBorder: "#FFD4B6",
  stockistPendingBg: "#FFF6EE",
  stockistGold: "#F6B21A",
  stockistSilver: "#AEB5C7",
  stockistBronze: "#C7793A",
  stockistRankDefault: "#E6E8F2",

  // Stockist Profile screen extras
  stockistProfileBadgeBlue: "#1465E8",
  stockistProfileValueText: "#252943",
  stockistProfileIconBg: "#F9FBFF",
  stockistBrown: "#A36A2A",
  switchTrackOff: "#D0D3DA",

  // Super Admin Payment screen extras
  superAdminBorder: "#D8DCE8",
  superAdminTabBorder: "#BFC3D3",
  superAdminCollectedBg: "#F0FAF3",
  superAdminCollectedBorder: "#88C99A",
  superAdminPendingBg: "#FFF8F1",
  superAdminCompanyText: "#44465F",
  superAdminGreenArea: "rgba(19, 138, 54, 0.12)",

  // Super Admin Companies screen extras
  companyTitleText: "#111111",
  superAdminActionIcon: "#45465E",
  companyInactiveBg: "#EEEEEE",
  companyInactiveBorder: "#B8BAC8",
  companyInactiveBorderLight: "#D5D5D5",
  companyInactiveText: "#333333",
  companyMetricDivider: "#E8EAF1",
  companyDeleteRed: "#FF1A1A",

  // Super Admin Profile screen extras
  superAdminAlertBg: "#FFF4EA",
  superAdminAddAdminBg: "#E5E7EF",

  // Super Admin Dashboard styles extras
  dashboardHealthText: "#1D2030",
  dashboardRevenueText: "#33364A",
  dashboardTabMuted: "#686A82",

  // Login screen extras
  loginBg: "#F4F8F9",
  loginBottomBg: "#F7FAFB",
  loginPrimary: "#103A94",
  loginButton: "#1F5CC1",
  loginForgot: "#1E4F95",
  loginText: "#111827",
  loginInputIcon: "#606773",
  loginInputBorder: "#818894",
  loginDivider: "#D5D8DE",

  // Forgot Password screen extras
  forgotPrimary: "#0D3696",
  forgotContainerBg: "#EEF2F3",
  forgotScreenBg: "#F7F9FA",
  forgotSubtitle: "#6B7280",
  forgotPhoneIcon: "#8A8F99",
  forgotPlaceholder: "#5F6670",
  forgotInputBorder: "#D8DDE5",
  forgotTimer: "#7A808A",
  forgotResendDisabled: "#9CA3AF",

  card: "#FFFFFF",
};

/** Same scale as old rs() values */
export const spacing = {
  xs: size(4),
  sm: size(8),
  md: size(12),
  lg: size(16),
  xl: size(24),
  xxl: size(32),
};

export const radius = {
  sm: size(6),
  md: size(10),
  lg: size(16),
  xl: size(24),
};

export const appTheme = {
  colors,
  fonts,
  fontSize,
  spacing,
  radius,
  size,
  textSize,
  dashboardTextSize,
  stockistProfileTextSize,
  superAdminTextSize,
  superAdminProfileTextSize,
  financeTextSize,
  networkSize,
  networkTextSize,
  mobileSize,
  mobileTextSize,
  forgotPasswordSize,
};
