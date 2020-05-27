var supertest = require("supertest"),
    api = supertest(process.env.URL + process.env.PORT),
    expect = require("chai").expect;

describe("creating user", () => {
    it("returns 201 on valid post", (done) => {
        let body = {
            email: "test_delete_later",
            password: "P@ssword",
        };
        api.post("/users").type("form").send(body).expect(201, done);
    });
    it("creates and returns a valid response", (done) => {
        let body = {
            email: "test_delete_later",
            password: "P@ssword",
        };
        api.post("/users")
            .type("form")
            .send(body)
            .end((err, res) => {
                if (err) expect.fail("Error: ", err);
                expect(res.body.userinfo.email).to.equal("test_delete_later");
                expect(res.body.userinfo.hash).to.have.length(60);
                expect(res.body._id).to.have.length(24);
                done();
            });
    });

    // TODO - Test invalid requests that should result in erros
});
