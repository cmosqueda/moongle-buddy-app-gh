import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import authStyles from "../../styles/authStyles";
// import { linkTo } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import { useAuth } from "@/utilities/authProvider";
import { validateEmail } from "@/utilities";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { FIREBASE_AUTH } from "@/firebase-helpers/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validCredentials, setValidCredentials] = useState<boolean>();

  // use login async func from auth provider
  const { login } = useAuth();

  // HANDLE LOGIN
  const handleLogin = async () => {
    let tempErrors = {};

    if (!email || !password) {
      tempErrors.allFieldsRequired = "All fields are required";
    }

    if (!validateEmail(email)) {
      tempErrors.email = "Invalid email format";
    }

    if (validCredentials === false) {
      tempErrors.isValid = "Invalid credentials.";
    }

    if (Object.keys(tempErrors).length === 0) {
      setErrors({});

      // end
    } else {
      setErrors(tempErrors);
    }

    // try catch block
    try {
      // use login func from auth provider
      await login(email, password);
      setValidCredentials(true);

      // router replace
      router.replace("/(main)");
    } catch (error) {
      setValidCredentials(false);
      console.error("Login failed", error);
      Alert.alert("Login failed", "Incorrect email or password.");
    }
  };

  return (
    <>
      {/* scroll style view */}
      <ScrollView style={authStyles.scrollStyle}>
        {/* parent view */}
        <View style={authStyles.parentView}>
          {/* logo image */}
          <View style={authStyles.logoView}>
            <Image style={authStyles.logo} source={require("../../assets/official-logo.png")}></Image>
          </View>

          {/* screen Label */}
          <View style={authStyles.screenLabel}>
            {/* title */}
            <Text style={authStyles.title}>Welcome to MOONGLE Buddy!</Text>

            {/* subtitle */}
            <Text style={authStyles.subTitle}>Please login to your existing account.</Text>
          </View>

          {/* form area = placeholder data for => email => password */}
          <View style={authStyles.formArea}>
            {errors.allFieldsRequired && <Text style={authStyles.isFalseText}>{errors.allFieldsRequired}</Text>}
            {errors.isValid && <Text style={authStyles.isFalseText}>{errors.isValid}</Text>}
            {/* email */}
            <TextInput
              textContentType="emailAddress"
              style={authStyles.textInput}
              placeholder="E-mail"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={setEmail}
            ></TextInput>
            {errors.email && <Text style={authStyles.isFalseText}>{errors.email}</Text>}

            {/* password */}
            <TextInput
              secureTextEntry={true}
              textContentType="password"
              style={authStyles.textInput}
              placeholder="Password"
              placeholderTextColor={"gray"}
              value={password}
              onChangeText={setPassword}
            ></TextInput>
            {errors.password && <Text style={authStyles.isFalseText}>{errors.password}</Text>}

            {/* continue button */}
            {/* nag simulate pako diri mao router push pa nakabutang */}
            <TouchableOpacity style={authStyles.continueButton} onPress={() => handleLogin()}>
              <Text style={authStyles.continueLabel}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* error handling here */}

          {/* switchScreen view = New user? Sign up */}
          <View style={authStyles.switchScreenView}>
            <Text style={authStyles.switchScreenText}>
              {/* forgot pass */}
              <Text style={authStyles.forgotPassText}>Forgot Password</Text> | New User?{" "}
              <Link href={"/(auth)/signup"} style={authStyles.toSingupLink}>
                Signup
              </Link>
            </Text>
          </View>
        </View>

        {/* or bar, wala pa */}
      </ScrollView>
    </>
  );
}
