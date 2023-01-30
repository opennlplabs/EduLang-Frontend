module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  testEnvironment: 'jsdom',
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/Styles/**',
    '!**/locales/**.json',
    '!**/styles/**',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native' +
      '|react-navigation-tabs' +
      '|@react-native-picker' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      '|native-base-shoutem-theme' +
      '|react-native-vector-icons' +
      '|react-native-step-indicator' +
      '|react-native-animatable' +
      '|react-native-easy-grid' +
      '|react-native-drawer' +
      '|glamorous-native' +
      '|react-native-keyboard-aware-scroll-view' +
      '|react-native-blur-overlay' +
      '|react-native-iphone-x-helper' +
      '|react-native-geocoding' +
      '|react-native-safe-area-view' +
      //+ "|react-native-device-info"
      '|react-native-calendar-picker' +
      '|react-native-datepicker' +
      '|react-native-linear-gradient' +
      '|aws-amplify' +
      '|react-native-switch-toggle' +
      '|react-native-blur-overlay' +
      '|react-native-modal' +
      '|react-native-animatable' +
      '|react-native-modal-dropdown' +
      '|react-native-blur' +
      '|react-native-modal-datetime-picker' +
      '|aws-amplify-react-native' +
      '|react-native-elements' +
      '|native-base' +
      '|react-native-highcharts' +
      '|pentair-dynamic-config' +
      '|deprecated-react-native-listview' +
      '|react-native-render-html' +
      '|react-native-webview' +
      '|react-native-datepicker' +
      '|react-native-animated-bar' +
      '|react-native-check-box' +
      '|@react-navigation' +
      '|@react-native-community' +
      '|react-native-calendar-strip' +
      '|react-native-google-places-autocomplete' +
      '|react-native-system-setting' +
      '|react-native-swipe-list-view' +
      '|react-native-draggable-flatlist' +
      '|react-native-wheel-picker' +
      '|react-native-maps' +
      '|react-native-localize' +
      '|react-native-i18n' +
      '|@segment/analytics-react-native' +
      '|@segment/analytics-react-native-mixpanel' +
      '|mywater-mobapp-consumer' +
      '|aws-sdk' +
      '|@aws-amplify' +
      '|mywater-mobapp-consumer' +
      '|react-native-country-picker-modal' +
      '|react-native-toast-message' +
      '|react-native-date-picker' +
      '|react-native-webview' +
      '|@pentair/card-collapsible' +
      ')/)',
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|esm)$':
      '<rootDir>/jest/__mock__/fileMock.js',
    i18$: '<rootDir>/jest/__mock__/react-native-i18n.js',
    'react-native-localize': '<rootDir>/jest/__mock__/react-native-localize.js',
    'react-native-i18n': '<rootDir>/jest/__mock__/react-native-i18n.js',

    //"react-native-device-info$": "<rootDir>/jest/__mock__/react-native-device-info.js",
    'react-native-safe-area-view$':
      '<rootDir>/jest/__mock__/react-native-safe-area-view.js',
    '@react-native-community/netinfo':
      '<rootDir>/jest/__mock__/react-native-net-info.js',
    'react-native-gesture-handler':
      '<rootDir>/jest/__mock__/react-native-gesture-handler.js',
    'react-native-render-html':
      '<rootDir>/jest/__mock__/react-native-render-html.js',
    'react-native-image-picker':
      '<rootDir>/jest/__mock__/react-native-image-picker.js',
    'react-native-text-input-mask':
      '<rootDir>/jest/__mock__/react-native-text-input-mask.js',
    'react-native-rootbeer': '<rootDir>/jest/__mock__/react-native-rootbeer.js',
    'react-native-exit-app': '<rootDir>/jest/__mock__/react-native-exit-app.js',
    'react-native-camera': '<rootDir>/jest/__mock__/react-native-camera.js',
    MaytronicModule: '<rootDir>/jest/__mock__/MaytronicModule.js',
    'react-navigation-hooks':
      '<rootDir>/jest/__mock__/react-navigation-hooks.js',
    'react-native-offline': '<rootDir>/jest/__mock__/react-native-offline.js',
    'react-native-sensors': '<rootDir>/jest/__mock__/react-native-sensors.js',
    'react-native-geocoding':
      '<rootDir>/jest/__mock__/react-native-geocoding.js',
    'react-native-system-setting':
      '<rootDir>/jest/__mock__/react-native-system-setting',
    'react-native-keyboard-aware-scroll-view':
      '<rootDir>/jest/__mock__/react-native-keyboard-aware-scroll-view',
    'react-native-draggable-flatlist':
      '<rootDir>/jest/__mock__/react-native-draggable-flatlist',
    'react-native-maps': '<rootDir>/jest/__mock__/react-native-maps.js',
    'react-native-in-app-review':
      '<rootDir>/jest/__mock__/react-native-in-app-review.js',
    //"mywater-mobapp-consumer":"<rootDir>/node_modules/mywater-mobapp-consumer",
    'mywater-mobapp-consumer':
      '<rootDir>/jest/__mock__/mywater-mobapp-consumer.js',
    'mobapp-Salt-Sensor': '<rootDir>',
    service:
      '<rootDir>/node_modules/mywater-mobapp-consumer/src/Common_Feature/Services',
    'aws-sdk': '<rootDir>/jest/__mock__/aws-sdk.js',
    'aws-amplify': '<rootDir>/jest/__mock__/@aws-amplify.js',
    'aws-amplify-react-native':
      '<rootDir>/jest/__mock__/aws-amplify-react-native.js',
    '@pentair-ui/mobile': '<rootDir>/jest/__mock__/@pentair-ui/mobile',
    '@pentair-ui/shared': '<rootDir>/jest/__mock__/@pentair-ui/shared',
    '@pentair/card-collapsible':
      '<rootDir>/jest/__mock__/@pentair/card-collapsible/lib',
    'react-native-zeroconf': '<rootDir>/jest/__mock__/react-native-zeroconf.js',
    loadash: '<rootDir>/jest/__mock__/loadash.js',
    //"style":"<rootDir>/mywater-mobapp-consumer/src/styles/theme/style.js"
    // "react-native-i18n":"<rootDir>/node_modules/react-native-i18n",
    '@react-native-async-storage/async-storage':
      '<rootDir>/jest/__mock__/asyncstorage.js',
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/jest/setup.js',
    '<rootDir>/jest/fileMock.js',
    '<rootDir>/Common_Feature/Images',
    ,
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/jest/setup.js',
    '<rootDir>/jest/fileMock.js',
    '<rootDir>/Common_Feature/Images',
  ],
  globals: {
    navigator: {},
    window: {
      // whatever you need, put here manually.
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/react-native-calendar-strip/',
    '/react-native-wheel-picker/',
  ],

  moduleFileExtensions: ['js', 'jsx', 'tsx'],
};
