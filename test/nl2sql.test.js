const request = require("supertest");
const app = require("../src/app");

describe("NL2sql API", () => {
  it("Success", (done) => {
    request(app)
      .post("/nl2sql")
      .send({
        sentence: "temukan nama mahasiswa dengan nama mengandung kata adi",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("data");
          done();
        }
      });
  });

  it("Unprocessable Entity", (done) => {
    request(app)
      .post("/nl2sql")
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(422);
          expect(res.body).toHaveProperty("errors");
          done();
        }
      });
  });

  it("Select Not Found", (done) => {
    request(app)
      .post("/nl2sql")
      .send({
        sentence: "mahasiswa dengan nim diatas 0902 dan angkatan dibawah 2018",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("SELECT not found");
          done();
        }
      });
  });

  it("Table Not Found", (done) => {
    request(app)
      .post("/nl2sql")
      .send({
        sentence: "Temukan adi",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Table not found");
          done();
        }
      });
  });

  it("Success index", (done) => {
    request(app)
      .get("/")
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          done();
        }
      });
  });
});
