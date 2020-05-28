var supertest = require("supertest"),
    api = supertest(process.env.URL + process.env.PORT),
    expect = require("chai").expect;

describe("create a goal and then fetch it", () => {
    let userid;
    let goalid;

    // NOTE - This test will fail if unable to create a user
    // SECTION - Valid vanilla part of test
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

    it("creates a goal for that user", (done) => {
        body = {
            title: "get ripped",
            priority: "2",
        };
        api.post(`/goals/${userid}`)
            .type("form")
            .send(body)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    console.error("error: ", err);
                    expect.fail();
                }
                expect(res.body._id).to.have.length(24);
                expect(res.body.title).to.equal("get ripped");
                expect(res.body.priority).to.equal("2");
                expect(res.body.createdOn).to.exist;
                goalid = res.body._id;
                done();
            });
    });

    it("fetches the goal that was just created", (done) => {
        api.get(`/goals/${userid}/${goalid}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    expect.fail();
                }
                expect(res.body.title).to.equal("get ripped");
                expect(res.body.priority).to.equal("2");
                expect(res.body.createdOn).to.exist;
                done();
            });
    });

    // SECTION - Bug / Error handling part of test

    let fakeid = "5ecf18b6c6ecf6c00c";
    let invalid = "5ecf18ecf6c00c";

    it("creates a goal for an invalid user", (done) => {
        body = {
            title: "become a chef",
            priority: "1",
        };
        api.post(`/goals/${fakeid}`).type("form").send(body).expect(400, done);
    });

    it("creates a goal with an invalid id", (done) => {
        body = {
            title: "become a chef",
            priority: "1",
        };
        api.post(`/goals/${invalid}`).type("form").send(body).expect(400, done);
    });

    it("fetches a goal with an invalid user", (done) => {
        api.get(`/goals/${fakeid}/${goalid}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });

    it("fetches a goal with an invalid user id", (done) => {
        api.get(`/goals/${invalid}/${goalid}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });

    it("fetches a goal from a valid user but fake goal id", (done) => {
        api.get(`/goals/${userid}/${fakeid}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });

    it("fetches a goal from a valid user but invalid goal id", (done) => {
        api.get(`/goals/${userid}/${invalid}`)
            .type("form")
            .send(body)
            .expect(400, done);
    });

    // TODO - Delete created user
});
