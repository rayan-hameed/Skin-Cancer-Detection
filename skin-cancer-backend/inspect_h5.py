import h5py

model_path = 'D:/Rayan/FYp/My FYP final code/skin-cancer-backend/skin_cancer_model.h5'

def visitor(name, obj):
    if isinstance(obj, h5py.Dataset):
        print(f"Dataset: {name}, Shape: {obj.shape}")

with h5py.File(model_path, 'r') as f:
    f.visititems(visitor)
