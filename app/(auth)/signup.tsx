import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import authStyles from "../../styles/authStyles";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "../../utilities/validationHelpers";
import { useAuth } from "@/utilities/authProvider";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [checkAccountExist, setCheckAccountExist] = useState<boolean>();
  const [passwordReqsShown, setPasswordReqsShown] = useState(false);

  const { signup } = useAuth();

  // // HANDLE FOCUS PASSWORD REQ SHOWN
  // const handleShowPasswordReq = () => {
  //   setPassword;
  //   setPasswordReqsShown(false);
  // };

  // HANDLE REGISTER
  const handleRegister = async () => {
    let tempErrors = {};

    if (!userName || !email || !password || !confirmPassword) {
      tempErrors.allFieldsRequired = "All fields are required";
    }

    if (!validateEmail(email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!validatePassword(password)) {
      setPasswordReqsShown(false);
      tempErrors.password =
        "Password must be at least 8 characters, include one special character, and one uppercase letter";
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    if (checkAccountExist === true) {
      tempErrors.accountExist = "This account is already registered.";
    }

    if (Object.keys(tempErrors).length === 0) {
      // for setting errors
      setErrors({});

      // end
    } else {
      setErrors(tempErrors);
    }

    // try catch block
    try {
      // use signup func from auth provider
      await signup(userName, email, password);
      setCheckAccountExist(false);

      // router replace
      router.replace("/(main)");
    } catch (error) {
      setCheckAccountExist(true);
      // tempErrors.checkAccountExist = "This account is already registered.";
      console.error("Error during signup", error);
      Alert.alert("Registration failed", "There was a problem creating your account. Please try again.");
    }
  };

  return (
    <>
      {/* scroll style view */}
      <ScrollView style={authStyles.scrollStyle} showsVerticalScrollIndicator={false}>
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
            <Text style={authStyles.subTitle}>Create your new account now!</Text>
          </View>

          {/* form area = placeholder data for
=> email
=> password
*/}
          <View style={authStyles.formArea}>
            {/* username */}
            {errors.allFieldsRequired && <Text style={authStyles.isFalseText}>{errors.allFieldsRequired}</Text>}
            <TextInput
              textContentType="username"
              style={authStyles.textInput}
              placeholder="Username"
              placeholderTextColor={"gray"}
              value={userName}
              onChangeText={setUserName}
              // onChangeText={(value) => {
              //   userName.current = value;
              // }}
            ></TextInput>

            {/* email */}
            <TextInput
              textContentType="emailAddress"
              style={authStyles.textInput}
              placeholder="E-mail"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={setEmail}
              // onChangeText={(value) => {
              //   email.current = value;
              // }}
            ></TextInput>
            {errors.email && <Text style={authStyles.isFalseText}>{errors.email}</Text>}
            {errors.accountExist && <Text style={authStyles.isFalseText}>{errors.accountExist}</Text>}

            {/* password */}
            <TextInput
              secureTextEntry={true}
              textContentType="password"
              style={authStyles.textInput}
              placeholder="Password"
              placeholderTextColor={"gray"}
              value={password}
              onChangeText={setPassword}
              // onChangeText={(value) => {
              //   password.current = value;
              // }}
              onFocus={() => setPasswordReqsShown(true)}
              onKeyPress={() => setPasswordReqsShown(false)}
            ></TextInput>
            {passwordReqsShown && (
              <Text style={authStyles.blackText}>
                Password must be at least 8 characters, include one special character, and one uppercase letter
              </Text>
            )}
            {errors.password && <Text style={authStyles.isFalseText}>{errors.password}</Text>}

            {/* confirm pass */}
            <TextInput
              secureTextEntry={true}
              textContentType="password"
              style={authStyles.textInput}
              placeholder="Confirm Password"
              placeholderTextColor={"gray"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              // onChangeText={(value) => {
              //   confirmPassword.current = value;
              // }}
            ></TextInput>
            {errors.confirmPassword && <Text style={authStyles.isFalseText}>{errors.confirmPassword}</Text>}

            {/* continue button */}
            {/* nag simulate pako diri mao router push pa nakabutang*/}
            <TouchableOpacity style={authStyles.continueButton} onPress={() => handleRegister()}>
              <Text style={authStyles.continueLabel}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* error handling here */}

          {/* switchScreen view = New user? Sign up */}
          <View style={authStyles.switchScreenView}>
            <Text style={authStyles.switchScreenText}>
              Already have an account?{" "}
              <Link href={"/(auth)/login"} style={authStyles.toSingupLink}>
                Login
              </Link>
            </Text>
          </View>
        </View>

        {/* or bar, wala pa */}
      </ScrollView>
    </>
  );
}
