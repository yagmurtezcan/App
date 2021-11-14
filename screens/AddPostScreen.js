import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';

import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
} from '../styles/AddPost';

const AddPostScreen = () => {
  const [image, setImage] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS == 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS == 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}
        <InputField
          placeholder="What is on your mind?"
          multiline
          numberOfLines={4}
        />
        <SubmitBtn>
          <SubmitBtnText>Post</SubmitBtnText>
        </SubmitBtn>
      </InputWrapper>
      <ActionButton buttonColor="rgba(0, 0, 0, 0.2)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={() => console.log('notes tapped!')}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={() => {}}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
