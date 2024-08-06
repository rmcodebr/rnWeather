import React, { useContext } from "react";
import { View, Image, Text } from "react-native";
import { DateTimeContext } from "./DateTimeContext";

const BackgroundImage = ({ children }) => {
  const { date, time, ampm } = useContext(DateTimeContext);
  return (
    <View className="flex-1">
      <View className="flex mt-10 z-10 mx-2 p-1 bg-slate-100/70 rounded-xl mb-2">
        <View className="flex mx-4">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-2xl font-bold">{time}</Text>
            </View>
            <View>
              <Text className="text-2xl font-semibold">{date}</Text>
            </View>
          </View>
        </View>
      </View>

      {ampm == "pm" ? (
        <Image
          source={require("../../assets/img/weatherNight.png")}
          className="absolute h-full w-full opacity-70"
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require("../../assets/img/weatherDay.png")}
          className="absolute h-full w-full opacity-70"
          resizeMode="cover"
        />
      )}

      {children}
    </View>
  );
};

export default BackgroundImage;
