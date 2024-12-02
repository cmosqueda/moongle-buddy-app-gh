import { HubHeader } from "@/hub-components/hubHeader";
import { QuizzesList } from "@/hub-components/quizzesList";
import { ScrollView, View } from "react-native";

export default function Quizzes() {
  return (
    <>
      {/* scroll style */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* parent view */}
        <View>
          {/* hub header => hub details */}
          <HubHeader></HubHeader>

          {/* quiz list */}
          <QuizzesList></QuizzesList>
        </View>
      </ScrollView>
    </>
  );
}
