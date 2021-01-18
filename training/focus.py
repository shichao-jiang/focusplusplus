import numpy as np
import os
import time

os.environ["KERAS_BACKEND"] = "plaidml.keras.backend"

import keras
import tensorflow as tf
import keras.applications as kapp
from keras.datasets import cifar10
import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from tensorflow.keras import datasets, layers, models
from tensorflow.keras.models import save_model
from tensorflow.keras.models import load_model
from PIL import Image
import tensorflowjs
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt

train = ImageDataGenerator(rescale=1./255, zoom_range=.2, horizontal_flip=True,width_shift_range=0.1, height_shift_range=0.1)
trainData = train.flow_from_directory("E:/Data/TestScreen", target_size=(150, 150), batch_size=32, class_mode='categorical')

test = ImageDataGenerator(rescale=1./255)
testData = test.flow_from_directory("E:/Data/TrainScreen", target_size=(150, 150), batch_size=32, class_mode='categorical')

class_names = ['Distracted Phone', 'Distracted Talking', 'Focused']

class model_callback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs):
        if logs.get("acc") > 0.95:
            self.model.stop_training=True

#Defining the Convolutional Neural Network
model = keras.models.Sequential([
  keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(150, 150, 3)),
  keras.layers.MaxPooling2D(2, 2),
  keras.layers.Conv2D(64, (3,3), activation='relu'),
  keras.layers.MaxPooling2D(2,2),
  keras.layers.Conv2D(128, (3,3), activation='relu'),
  keras.layers.MaxPooling2D(2,2),
  keras.layers.Flatten(),
  keras.layers.Dropout(0.2),
  keras.layers.Dense(256, activation='relu'),
  keras.layers.Dense(3, activation='softmax')
])

model.summary()

#model.compile(loss ='categorical_crossentropy', optimizer='adam' ,metrics =['accuracy'])

#Training the CNN model
#callback = model_callback()
#model.fit_generator(trainData, epochs = 20, verbose = 1, validation_data = testData, callbacks=[callback], steps_per_epoch=50, validation_steps=20)

#filepath = './saved_model'
#model.save("Keras-Model")
#tensorflowjs.converters.save_keras_model(model, "tfjsmodel")

filepath = './Keras-Model2'

loaded_model = load_model(filepath)

def predict(filename):
    img_data = Image.open(filename)
    img_arr = np.array(img_data)
    #img_arr = 255 - img_arr
    img_arr = img_arr / 255.0

    plt.xticks([])
    plt.yticks([])
    plt.grid(False)
    plt.imshow(img_arr, cmap=plt.cm.binary)
    plt.show()

    test_image = img_arr.reshape(1, 150, 150, 3)
    print(test_image.shape)

    predictions = loaded_model.predict(test_image)
    prediction = np.argmax(predictions[0])
    print(f'Prediction: {class_names[int(prediction)]}')
    return class_names[int(prediction)]

predict('test/test0244.jpg')
