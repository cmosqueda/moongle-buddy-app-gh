import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { Link, router } from "expo-router";
import authStyles from "@/styles/authStyles";

export default function Signup() {
  return (
    <>
      {/* scroll style view */}
      <ScrollView style={authStyles.scrollStyle}>
        {/* parent view */}
        <View style={authStyles.parentView}>
          {/* logo image */}
          <View style={authStyles.logoView}>
            <Image style={authStyles.logo} source={require("@/assets/official-logo.png")}></Image>
          </View>

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
            {/* nag simulate pako diri mao router push pa nakabutang*/}
            <TouchableOpacity style={authStyles.continueButton} onPress={() => router.push("/(main)")}>
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
