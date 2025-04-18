import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const TableBookingScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        style={{ flex: 1 }}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://static.elfsight.com/platform/platform.js" async></script>
              </head>
              <body style="margin:0;padding:0;">
                <div class="elfsight-app-f601f47a-8895-4c01-961a-01d50bbfde6a" data-elfsight-app-lazy></div>
              </body>
            </html>
          `
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TableBookingScreen;
