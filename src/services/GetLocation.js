import * as Location from "expo-location";

const GetLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  try {
    let location = await Location.getCurrentPositionAsync({});
    // console.log(location);
    return location;
  } catch (error) {
    console.error("Deu ruim na localização", error);
    return null;
  }
};

export default GetLocation;
