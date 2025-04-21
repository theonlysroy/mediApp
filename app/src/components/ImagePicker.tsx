import {Dispatch, SetStateAction} from 'react';
import {Image, TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {FileuploadIcon} from '../CustomIcons';

interface ImagePickerProps {
  imageUri: string | undefined | null;
  setImageUri: Dispatch<SetStateAction<string | undefined | null>>;
}

const ImagePicker = ({imageUri, setImageUri}: ImagePickerProps) => {
  const handleSelectImage = () => {
    Alert.alert('Upload Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({mediaType: 'photo'}, response => {
            if (
              !response.didCancel &&
              !response.errorCode &&
              response.assets?.length
            ) {
              setImageUri(response.assets[0].uri);
            }
          });
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({mediaType: 'photo'}, response => {
            if (
              !response.didCancel &&
              !response.errorCode &&
              response.assets?.length
            ) {
              setImageUri(response.assets[0].uri);
            }
          });
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <TouchableOpacity style={styles.imageWrapper} onPress={handleSelectImage}>
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>
          <FileuploadIcon size={25} />
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    fontSize: 18,
    color: '#64748b',
  },
});

export default ImagePicker;
