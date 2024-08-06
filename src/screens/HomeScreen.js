import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from "react-native";
import BackgroundImage from "../components/BackgroundImage";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import DataWeatherLight from "../data/DataWeatherCivilLight";
import { getDateCivilLight } from "../data/DataHelper";
import { IMAGESCIVILLIGHT } from "../data/ImageHelper";
import GetLocation from "../services/GetLocation";
import { GetReverseGeocoding } from "../services/GetReverseGeocoding";
import { GetWeatherCivilLightData } from "../services/GetWeatherCivilLightData";

export default function HomeScreen({ navigation }) {
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [location, setLocation] = useState([1, 2, 3]);
  const [dataCivilLight, setDataCivilLight] = useState([]);
  const [reverseGeocoding, setReverseGeocoding] = useState([]);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  useEffect(() => {
    // setDataCivilLight(DataWeatherLight);
    (async () => {
      const location = await GetLocation();
      setLocation(location);
      // console.log(location);
      let [lat, lon, accu, alt] = [
        location.coords.latitude,
        location.coords.longitude,
        location.coords.accuracy,
        location.coords.altitude,
      ];
      setLat(lat);
      setLon(lon);

      const weatherCivilLightData = await GetWeatherCivilLightData(lat, lon);
      setDataCivilLight(weatherCivilLightData);

      const reverseGeocoding = await GetReverseGeocoding(lat, lon);
      setReverseGeocoding(reverseGeocoding);
      // console.log(reverseGeocoding);
      setShowSearchBar(false);
    })();
  }, []);

  return (
    <BackgroundImage>
      <View className="flex-1 mt-2">
        <View
          className={
            showSearchBar
              ? `mx-4 p-2 bg-slate-100/70 rounded-md border-slate-500 mb-2`
              : `mx-4 p-2 bg-slate-100/70 rounded-xl mb-2`
          }
        >
          <View className="flex-row justify-between items-center">
            <Pressable
              onPress={async () => {
                const location = await GetLocation();
                setLocation(location);
                // console.log(location);
                let [lat, lon, accu, alt] = [
                  location.coords.latitude,
                  location.coords.longitude,
                  location.coords.accuracy,
                  location.coords.altitude,
                ];
                setLat(lat);
                setLon(lon);

                const reverseGeocoding = await GetReverseGeocoding(lat, lon);
                setReverseGeocoding(reverseGeocoding);
                // console.log(reverseGeocoding);
                setShowSearchBar(false);
              }}
            >
              <FontAwesome name="map-marker" size={44} color="black" />
            </Pressable>
            {showSearchBar ? (
              <TextInput placeholder="Cidade" />
            ) : (
              <View>
                {reverseGeocoding.localityInfo.administrative ? (
                  <View className="justify-center items-center">
                    <Text className="text-3xl font-bold">
                      {reverseGeocoding.locality}
                    </Text>

                    <Text className="text-xl font-semibold">
                      {
                        reverseGeocoding.localityInfo.administrative[
                          reverseGeocoding.localityInfo.administrative.length -
                            1
                        ].name
                      }
                    </Text>
                    <Text className="text-xs">{reverseGeocoding.city}</Text>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            )}

            <Pressable onPress={() => setShowSearchBar(!showSearchBar)}>
              <FontAwesome name="search" size={34} color="black" />
            </Pressable>
          </View>
          {location.length > 0 && showSearchBar ? (
            <View className="absolute w-full bg-slate-300 border-slate-500 mx-2 p-2 top-16 rounded-md">
              {location.map((loc, index) => {
                return (
                  <Pressable
                    key={index}
                    className="flex-row bg-slate-400/10 items-center rounded-md mb-2 p-2 space-x-2"
                  >
                    <FontAwesome name="map" size={18} color="black" />

                    <Text>Sao Paulo, Brasil</Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* forecast section */}
        <>
          {dataCivilLight ? (
            <View className="items-center -z-50">
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="mb-32"
              >
                {dataCivilLight?.dataseries?.map((d, index) => (
                  <View key={index}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Detail", {
                          dateCivil: d.date,
                          lat: lat,
                          lon: lon,
                        })
                      }
                    >
                      <View className="rounded-xl my-1 bg-slate-100/70 border border-slate-300 shadow-md">
                        <View className="flex-row px-4 justify-between items-center rounded-md bg-slate-100/70 shadow-xl shadow-slate-500">
                          <Text className="text-3xl font-semibold">
                            {getDateCivilLight(d.date).dayOfWeek}
                          </Text>
                          <View className="items-center">
                            <Text className="text-4xl font-bold">
                              {getDateCivilLight(d.date).day}
                            </Text>
                            <Text className="text-2xl">
                              de {getDateCivilLight(d.date).month}
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row justify-between">
                          <ImageBackground
                            className="w-48 h-36"
                            source={IMAGESCIVILLIGHT[d.weather]}
                          ></ImageBackground>

                          <View className="flex-row px-2 justify-between items-center">
                            <Image
                              className="w-12 h-12 mr-2 right-6"
                              resizeMode="cover"
                              source={require("../../assets/img/maxMinTemp.png")}
                            />
                            <View className="right-5">
                              <Text className="text-5xl font-bold text-red-500">
                                {d.temp2m.max}
                              </Text>
                              <Text className="text-5xl font-bold text-blue-700">
                                {d.temp2m.min}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <View className="flex-1 flex-row justify-end mx-4 items-center mb-1">
                            <Image
                              className="h-8 w-8 mr-2"
                              source={require("../../assets/img/windy.png")}
                            />
                            <Text className="text-2xl font-semibold">
                              {d.wind10m_max * 3.6}{" "}
                              <Text className="text-lg">km/h</Text>
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </>

        <View className="flex-1 justify-center items-center">
          <Pressable onPress={() => navigation.navigate("ScreenA")}>
            <Text className="text-2xl font-semibold">Go to Screen A</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ScreenB")}>
            <Text>Go to Screen B</Text>
          </Pressable>
        </View>
      </View>
    </BackgroundImage>
  );
}
