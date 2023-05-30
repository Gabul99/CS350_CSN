import storage from "@react-native-firebase/storage";
import { useState } from "react";
import { Platform } from "react-native";

export const useStorage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  let downloadUrl;

  const uploadAndGetURL = async (path: string, uri?: string, base64Data?: string) => {
    const reference = storage().ref(path);
    if (Platform.OS === 'ios') {
      if (!uri) return;
      setLoading(true);
      await reference.putFile(uri);
      downloadUrl = await reference.getDownloadURL();
      setLoading(false);
      return downloadUrl;
    } else {
      if (!base64Data) return;
      setLoading(true);
      await reference.putString(base64Data, "base64");
      downloadUrl = await reference.getDownloadURL();
      setLoading(false);
      return downloadUrl;
    }
  }

  return {isLoading, uploadAndGetURL};
}
