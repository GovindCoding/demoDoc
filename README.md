# pki
PKI Web Services

# Install dependencies
Run command "npm install" to install the dependencies in the local node_modules folder.

# Run app 
Run app using "npm run start" which will start the nodejs server on 3007 port.

#Extracting the cert/key files from jks :

To convert a JKS (.jks) keystore to a PKCS12 (.p12) keystore, run the following command:
Note: This command is supported on JDK / JRE keytool versions 1.6 and greater.
keytool -importkeystore -srckeystore [MY_KEYSTORE.jks] -destkeystore [MY_FILE.p12] -srcstoretype JKS - deststoretype PKCS12 -deststorepass [PASSWORD_PKCS12]
MY_KEYSTORE.jks: path to the keystore that you want to convert. (pso-magnum-prod-ra.jks)
MY_FILE.p12: path to the PKCS#12 file (.p12 or .pfx extension) that is going to be created.(pso-magnum-prod-ra.p12)

PASSWORD_PKCS12: password that will be requested at the PKCS#12 file opening.(e.g. changeit)

To verify the content of .p12 (e.g. MY_FILE.p12), run the following command:
keytool -list -v -keystore MY_FILE.p12 -storetype pkcs12

To convert a  PKCS12 (.p12) keystore to .crt file, run the following command:
openssl pkcs12 -in [MY_FILE.p12]  -nokeys -out [MY_CRT.crt]
MY_FILE.p12: path to the PKCS#12 file
MY_CRT.crt: path to the crt file that is going to be created.

To convert a  PKCS12 (.p12) keystore to .key file, run the following command:
openssl pkcs12 -in [MY_FILE.p12]  - nocerts -nodes -out [MY_KEY.key]
MY_FILE.p12: path to the PKCS#12 file
MY_KEY.key: path to the key file that is going to be created.
