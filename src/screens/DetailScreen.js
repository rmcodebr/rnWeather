import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  Modal,
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
import FontAwesome from "@expo/vector-icons/FontAwesome";

const DetailScreen = ({ navigation }) => {
  const route = useRoute();
  const date = route.params?.dateCivil;
  const lat = route.params?.lat;
  const lon = route.params?.lon;
  const [dataWeather, setDataWeather] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Toggle modal visibility
  const toggleModal = (item) => {
    setSelectedItem(item);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const weatherCivilData = await GetWeatherCivilData(lat, lon);
      setDataWeather(filterDataForDate(weatherCivilData, date));
      setLoading(false);
    })();

    // setDataWeather(filterDataForDate(DataWeather, date));
  }, []);

  // console.log(dataWeather);

  return (
    <BackgroundImage>
      {!loading ? (
        <View className="flex-1 mx-2">
          <View>
            <View>
              {date && (
                <View className="flex items-center space-x-2  bg-slate-100/70 rounded-md">
                  <View className="flex-row items-center justify-between">
                    <View className="">
                      <Pressable
                        onPress={() => navigation.navigate("Home")}
                        className="rounded-md p-2"
                      >
                        <Text className="">
                          <FontAwesome
                            name="arrow-circle-left"
                            size={44}
                            color="#0284c7"
                          />
                        </Text>
                      </Pressable>
                    </View>
                    <View>
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
                    <View className="m-2" key={`${dCivil.timepoint}-${index}`}>
                      <View className="flex p-1 bg-slate-600/50 rounded-2xl mb-1">
                        <View className="flex-row justify-around items-center mx-2">
                          <Pressable
                            className="absolute top-1 left-1"
                            onPress={() => toggleModal(dCivil)}
                          >
                            <FontAwesome
                              name="exclamation-circle"
                              size={24}
                              color="black"
                            />
                          </Pressable>

                          <Image
                            className="h-22 w-22 rounded-3xl"
                            resizeMode="scale"
                            source={IMAGESCIVIL[dCivil.weather]}
                          />
                        </View>
                      </View>
                      <View className="rounded-2xl w-48 border border-slate-300 bg-slate-400/70 p-4">
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
              {/* Modal component */}
              <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => toggleModal(null)}
              >
                <View>
                  <View className="p-2 mx-4 bg-slate-700/90 mt-48 rounded-2xl justify-center items-center">
                    <View className="m-2 p-4 items-center">
                      {selectedItem && (
                        <>
                          <View className="bg-slate-100/30 justify-center items-center mx-10 w-full rounded-2xl">
                            <Image
                              className="w-44 rounded-3xl"
                              resizeMode="scale"
                              source={IMAGESCIVIL[selectedItem.weather]}
                            />
                          </View>
                          <Text className="text-2xl p-2 text-slate-100">
                            {getWeatherDescriptionPort(selectedItem.weather)}
                          </Text>
                          <Text>{}</Text>
                          <Text className="text-xl mt-2">
                            {/* You can add more details about selectedItem here */}
                          </Text>
                          <Pressable
                            className="p-2 rounded-2xl bg-slate-500"
                            onPress={() => toggleModal(null)}
                          >
                            <Text className="text-lg">Close</Text>
                          </Pressable>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Image source={require("../../assets/loaders/mariosports.gif")} />
        </View>
      )}
    </BackgroundImage>
  );
};

export default DetailScreen;
