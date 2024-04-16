import { testServer } from "./index.js";
import { expect } from "chai";

const serverPort = 8081;

let server;

describe("try to test a web server", () => {
  before(async () => {
    server = (await testServer(serverPort)).server;
  });
  after(async () => {
    server.close();
  });

  it("calls an endpoint that triggers an error", async () => {
    const response = await fetch(`http://localhost:${serverPort}/error`);
    expect(response.status).to.equal(500);
  });

  it("calls an endpoint that does not trigger an error", async () => {
    const response = await fetch(`http://localhost:${serverPort}/ok`);
    expect(response.status).to.equal(200);
  });
});
