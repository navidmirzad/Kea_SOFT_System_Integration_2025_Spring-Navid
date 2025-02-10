import pickle

data = {
    'id': 1,
    'age': 24,
    'name': 'Navid',
    'scores': [10, 12, 10, 12],
    'is_active': True
}

filename = "data.pickle"

with open(filename, 'wb') as file:
    pickle.dump(data, file)
    print(f"Data has been serialized and written to {filename}.")
    print("Original data: ", data)

with open(filename, 'rb',) as file:
    loaded_data = pickle.load(file)
    print(f"Data has been deserialized from the file.")
    print("Loaded data: ", loaded_data)

