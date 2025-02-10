import v8 from "v8";

const data = {
  id: 1,
  name: "Navid",
  age: 24,
  hobbies: ["basketball", "music"],
  isActive: true,
};

console.log("Data before serialization: ", data);

const serializedData = v8.serialize(data);
console.log("Serialized data: ", serializedData);

const deserializedData = v8.deserialize(serializedData);
console.log("Deserialized data: ", deserializedData);
