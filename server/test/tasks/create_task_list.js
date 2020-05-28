var supertest = require("supertest"),
    api = supertest(process.env.URL + process.env.PORT),
    expect = require("chai").expect;

describe("wrong requests when creating a tasklist", () => {
    it("returns 404 when no userid is set in the url parameter", (done) => {
        let body = {
            title: "weekly tasks",
        };
        api.post("/tasks/list").type("form").send(body).expect(404, done);
    });
    it("returns 400 when userid url parameter is invalid", (done) => {
        let body = {
            title: "weekly tasks",
        };
        let fake_but_valid_id = "123213df";
        api.post(`/tasks/list/${fake_but_valid_id}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });
});

describe("creating a user and then gives them a tasklist and then a task", () => {
    // NOTE - This test will fail if unable to create a user
    let userid;
    let listid;

    it("creates a user", (done) => {
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
        body = {
            title: "daily tasks",
        };
        api.post(`/tasks/list/${userid}`)
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
                listid = res.body._id;
                done();
            });
    });

    it("adds a task to this task list", (done) => {
        body = {
            title: "a new task",
        };
        api.post(`/tasks/${userid}/${listid}`)
            .type("form")
            .send(body)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.error("error: ", err);
                    expect.fail();
                }
                expect(res.body._id).to.have.length(24);
                expect(res.body.title).to.equal("a new task");
                expect(res.body.completed).to.be.false;
                expect(res.body.createdOn).to.exist;
                done();
            });
    });

    let fakeid = "5ecf18b6c6ecf6c00c";

    it("rejects an invalid userid", (done) => {
        body = {
            title: "a new task",
        };
        api.post(`/tasks/${fakeid}/${listid}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });

    it("rejects an invalid tasklist", (done) => {
        body = {
            title: "a new task",
        };
        api.post(`/tasks/${userid}/${fakeid}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });

    let fakebutvalidid = "5ecf1b3eb00ba65b2456bc45";

    it("rejects valid IDs that are not found in the database", (done) => {
        body = {
            title: "a new task",
        };
        api.post(`/tasks/${fakebutvalidid}/${fakebutvalidid}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });

    // TODO - Delete the user that was just created
});

// SECTION
// NOTE YOOO. Write some tests for the updates you just made. Check nyc to see what needs testing.
// TODO
