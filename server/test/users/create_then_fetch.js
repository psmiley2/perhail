// Create a user and then get it from the DB
var supertest = require("supertest"),
    api = supertest(process.env.URL + process.env.PORT),
    expect = require("chai").expect;

describe("create a user and then fetch them", () => {
    let user;
    it("creates a user", (done) => {
        let body = {
            email: "test_delete_later@mail.com",
            password: "P@ssword",
        };
        api.post("/users")
            .type("form")
            .send(body)
            .expect(201)
            .end((err, res) => {
                if (err) expect.fail("Error: ", err);
                user = res.body;
                done();
            });
    });
    it("fetches the user", (done) => {
        let userid = user._id;
        api.get(`/users/${userid}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log("err: ", err);
                    expect.fail("Error: ", err);
                }
                expect(res.body.userinfo.email).to.equal(
                    "test_delete_later@mail.com"
                );
                expect(res.body.userinfo.hash).to.have.length(60);
                expect(res.body._id).to.have.length(24);
                done();
            });
    });
});
