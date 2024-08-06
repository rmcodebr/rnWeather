import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import DataWeather from "../data/DataWeatherCivil";
import {
  addHoursAndExtractInfo,
  filterDataForDate,
  getCloudCoverDescriptionPort,
  getCloudDescription,
  getDateCivilLight,
  getLiftedIndex,
  getPrecipitationRate,
  getPrecipitationType,
  getPreciptationAmountDescription,
  getWeatherDescription,
  getWeatherDescriptionPort,
  getWeatherType,
  getWindDescription,
  getWindDirectionDescription,
} from "../data/DataHelper";
import { useRoute } from "@react-navigation/native";
import { IMAGESCIVIL, WIND } from "../data/ImageHelper";
import BackgroundImage from "../components/BackgroundImage";
import { GetWeatherCivilData } from "../services/GetWeatherCivilData";

const DetailScreen = ({ navigation }) => {
  const route = useRoute();
  const date = route.params?.dateCivil;
  const lat = route.params?.lat;
  const lon = route.params?.lon;
  const [dataWeather, setDataWeather] = useState([]);

  useEffect(() => {
    (async () => {
      const weatherCivilData = await GetWeatherCivilData(lat, lon);
      setDataWeather(filterDataForDate(weatherCivilData, date));

      // console.log(reverseGeocoding);
    })();
    // setDataWeather(filterDataForDate(DataWeather, date));
  }, []);

  return (
    <BackgroundImage>
      <View className="flex-1 mx-2">
        <View>
          <View className="">
            <Pressable
              onPress={() => navigation.navigate("Home")}
              className="rounded-md p-2"
            >
              <Text className="text-xl absolute">voltar</Text>
            </Pressable>
          </View>
          <View>
            {date && (
              <View className="flex items-center space-x-2  bg-slate-100/70 rounded-md">
                <View className="flex-row ">
                  <Text className="text-3xl font-bold">
                    {getDateCivilLight(date).dayOfWeek},
                  </Text>
                  <Text className="text-4xl font-bold ml-2">
                    {getDateCivilLight(date).day}
                  </Text>
                </View>
                <View className="flex-row">
                  <Text className="text-2xl font-bold">
                    {`de ${getDateCivilLight(date).month} de`}
                  </Text>
                  <Text className="text-2xl font-bold ml-2">
                    {getDateCivilLight(date).year}
                  </Text>
                </View>
              </View>
            )}

            <FlatList
              // ItemSeparatorComponent={() => (
              //   <View style={{ backgroundColor: "#00000023", width: 1 }} />
              // )}
              horizontal={true}
              data={dataWeather}
              renderItem={({ item: dCivil, index }) => {
                return (
                  <View className="m-2">
                    <View className="flex items-center bg-slate-600/30 rounded-2xl mb-1">
                      <Image
                        className="h-36 w-36 rounded-3xl"
                        source={IMAGESCIVIL[dCivil.weather]}
                      />
                    </View>
                    <View className="rounded-lg w-48 border border-slate-300 bg-slate-100/70 p-4">
                      <View className="flex-row justify-between items-baseline">
                        <View className="flex-row mb-2 items-baseline">
                          <Text className="text-4xl font-bold">
                            {
                              addHoursAndExtractInfo(
                                DataWeather.init,
                                dCivil.timepoint
                              ).hour
                            }
                          </Text>
                          <Text className=""> hs</Text>
                        </View>
                        <View className="flex-row">
                          <View className="flex-row justify-evenly">
                            <Image
                              className="h-6 w-6 mx-2"
                              source={require("../../assets/img/maxMinTemp.png")}
                            />
                          </View>
                        </View>

                        <View className="flex-row items-baseline">
                          <Text className="text-4xl font-bold">
                            {dCivil.temp2m}
                          </Text>
                          <Text className="text-xl">&#176;C</Text>
                        </View>
                      </View>

                      <View className="flex">
                        <Text className="text-lg flex-wrap">
                          {getWeatherDescriptionPort(dCivil.weather)}
                        </Text>
                      </View>

                      <View className="flex-row">
                        <View className="flex-row justify-evenly">
                          <Image
                            className="h-8 w-8 mx-2"
                            source={require("../../assets/img/cloudCover.png")}
                          />
                        </View>
                        <View className="flex">
                          <Text className="text-lg flex-wrap">
                            {getCloudCoverDescriptionPort(dCivil.cloudcover)}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row">
                        <View className="flex-row justify-evenly">
                          <Image
                            className="h-8 w-8 mx-2"
                            source={require("../../assets/img/humidity.png")}
                          />
                        </View>
                        <View className="flex">
                          <Text className="text-lg flex-wrap">
                            {dCivil.rh2m}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row">
                        <View className="flex-row justify-evenly">
                          <Image
                            className="h-8 w-8 mx-2"
                            source={require("../../assets/img/preciptation.png")}
                          />
                        </View>
                        <View className="flex">
                          <Text className="text-lg flex-wrap">
                            {getPreciptationAmountDescription(
                              dCivil.prec_amount
                            )}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row">
                        <View className="flex-row justify-evenly items-center mt-5">
                          <Image
                            className="h-6 w-6"
                            source={require("../../assets/weatherIcons/weather/windy.png")}
                          />
                          <Text className="text-xl">
                            {getWindDescription(dCivil.wind10m.speed)}
                          </Text>
                        </View>
                      </View>
                      <View className="flex items-center">
                        <Image
                          className="h-10 w-10 rounded-3xl"
                          source={WIND[dCivil.wind10m.direction]}
                        />
                        <Text>
                          {getWindDirectionDescription(
                            dCivil.wind10m.direction
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <Text className="text-xl">{dataWeather.init}</Text>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="p-2"
          >
            {dataWeather.map((w, key) => (
              <View key={key} className="p-1">
                <View className="border p-2 bg-slate-300 rounded-md">
                  <View>
                    <Text>{w.timepoint}</Text>
                    {/* <Text>
                    {addHoursAndExtractInfo(dataWeather.init, w.timepoint)}
                  </Text> */}
                    <Text>Tempo: {getWeatherType(w.weather)}</Text>
                    <Text>Descr: {getWeatherDescription(w.weather)}</Text>
                    <Text>Temp: {w.temp2m}</Text>
                    <Text>Humidade: {w.rh2m}</Text>
                    <Text>Nuvem: {getCloudDescription(w.cloudcover)}</Text>
                    <Text>Prec: {getPrecipitationType(w.prec_type)}</Text>
                    <Text>Prec qty: {getPrecipitationRate(w.prec_amount)}</Text>

                    <Text>Vento: {getWindDescription(w.wind10m.speed)}</Text>
                    <Text>Vento dir: {w.wind10m.direction}</Text>
                    <Text>Lifited Index: {getLiftedIndex(w.lifted_index)}</Text>
                    <Text></Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View></View>
      </View>
    </BackgroundImage>
  );
};

export default DetailScreen;
