import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const packageDefinition = loadSync("hello.proto");
const helloProto = loadPackageDefinition(packageDefinition).Greeter;

function sayHello(call, callback) {
  callback(null, { message: `Hello, ${call.request.name}` });
}

const server = new Server();
server.addService(helloProto.service, { SayHello: sayHello });
server.bindAsync(
  "0.0.0.0:50051",
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Server binding error:", err);
      return;
    }
    console.log(`Server running at 0.0.0.0:${port}`);
    server.start();
  }
);
