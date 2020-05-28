var supertest = require("supertest"),
    api = supertest(process.env.URL + process.env.PORT),
    expect = require("chai").expect;

describe("wrong requests when creating a tasklist", () => {
    it("returns 400 when no userid is set in the query parameter", (done) => {
        let body = {
            title: "weekly tasks",
        };
        api.post("/tasks/newlist").type("form").send(body).expect(400, done);
    });
    it("returns 400 when query parameter is invalid", (done) => {
        let body = {
            title: "weekly tasks",
        };
        let fake_but_valid_id = "123213df";
        api.post(`/tasks/newlist?userid=${fake_but_valid_id}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });
});

describe("creating a user and then giving them a tasklist", () => {
    // NOTE - This test will fail if unable to create a user
    let userid;
    it("creates a user", (done) => {
        // create a user
        let body = {
            email: "test_delete_later",
            password: "P@ssword",
        };
        api.post("/users")
            .type("form")
            .send(body)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.error("error: ", err);
                    expect.fail();
                }
                userid = res.body._id;
                done();
            });
    });
    it("adds a tasklist for the created user", (done) => {
        // Add a task list for the created user
        body = {
            title: "daily tasks",
        };
        console.log("user id ", userid);
        api.post(`/tasks/newlist?userid=${userid}`)
            .type("form")
            .send(body)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.error("error: ", err);
                    expect.fail();
                }
                expect(res.body._id).to.have.length(24);
                expect(res.body.title).to.equal("daily tasks");
                expect(res.body.tasks).to.exist;
                expect(res.body.tasks).to.have.length(0);
                done();
            });
    });
});
