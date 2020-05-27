var supertest = require("supertest"),
    api = supertest(process.env.URL + process.env.PORT),
    expect = require("chai").expect;

describe("fetching user", () => {
    it("returns 400 on request with invalid userid", (done) => {
        api.get("/users/5ecebd8dbf2f23f463c994198").expect(400, done);
    });

    // Valid request tested in "test/integrations/users.js"
});
