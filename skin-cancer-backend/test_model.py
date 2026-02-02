import os
import tf_keras as keras
import traceback
import sys
import numpy as np

model_path = 'D:/Rayan/FYp/My FYP final code/skin-cancer-backend/skin_cancer_model.h5'

print(f"Attempting to rebuild model and load weights from: {model_path}")
try:
    # Rebuild architecture
    base_model = keras.applications.MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights=None)
    x = keras.layers.GlobalAveragePooling2D()(base_model.output)
    output = keras.layers.Dense(1, activation='sigmoid', name='dense')(x)
    model = keras.models.Model(inputs=base_model.input, outputs=output)
    
    # Load weights
    model.load_weights(model_path, by_name=True)
    print("Model weights loaded successfully!")
    model.summary()
    
    # Test prediction
    dummy_input = np.random.rand(1, 224, 224, 3).astype(np.float32)
    pred = model.predict(dummy_input)
    print(f"Dummy Prediction: {pred}")
    
except Exception as e:
    print("Failed to rebuild/load model weights.", file=sys.stderr)
    traceback.print_exc(file=sys.stderr)
