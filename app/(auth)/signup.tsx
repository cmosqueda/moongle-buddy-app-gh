import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import authStyles from "@/styles/authStyles";

export default function Signup() {
  return (
    <>
      {/* scroll style view */}
      <ScrollView style={authStyles.scrollStyle}>
        {/* parent view */}
        <View style={authStyles.parentView}>
          {/* logo image */}
          <View></View>

          {/* screen Label */}
          <View style={authStyles.screenLabel}>
            {/* title */}
            <Text style={authStyles.title}>Welcome to Moongle Buddy!</Text>

            {/* subtitle */}
            <Text style={authStyles.subTitle}>Create your new account now!</Text>
          </View>

          {/* form area = placeholder data for
=> email
=> password
*/}
          <View style={authStyles.formArea}>
            {/* username */}
            <TextInput style={authStyles.textInput} placeholder="Username" placeholderTextColor={"gray"}></TextInput>

            {/* email */}
            <TextInput style={authStyles.textInput} placeholder="E-mail" placeholderTextColor={"gray"}></TextInput>

            {/* password */}
            <TextInput style={authStyles.textInput} placeholder="Password" placeholderTextColor={"gray"}></TextInput>

            {/* confirm pass */}
            <TextInput
              style={authStyles.textInput}
              placeholder="Confirm Password"
              placeholderTextColor={"gray"}
            ></TextInput>

            {/* continue button */}
            <TouchableOpacity style={authStyles.continueButton}>
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
