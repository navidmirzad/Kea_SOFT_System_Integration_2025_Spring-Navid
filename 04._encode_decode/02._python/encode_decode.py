name = "Navid"

bytes_encoded = name.encode(encoding="utf-8")
print(type(bytes_encoded))

name_decoded = bytes_encoded.decode()
print(type(name_decoded))

print("Encoded bytes: ", bytes_encoded)
print("Decoded bytes: ", name_decoded)
print(name == name_decoded, name == name_decoded)

""" message = "Navïd"

encoded_message = message.encode()
print(encoded_message)
print(type(encoded_message))

decoded_message = encoded_message.decode()
print(decoded_message)
print(type(decoded_message))

print("Encoded message: ", encoded_message)
print("Decoded message: ", decoded_message) """
