const request = require("supertest");
const app = require("../src/app");

describe("Query API", () => {
  it("Success", (done) => {
    request(app)
      .post("/v1/query")
      .send({
        sentence:
          "temukan nama mahasiswa dengan nim diatas 0902 dan angkatan lebih kecil sama dengan 2018",
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
      .post("/v1/query")
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
      .post("/v1/query")
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
      .post("/v1/query")
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

  it("Data Not Found", (done) => {
    request(app)
      .post("/v1/query")
      .send({
        sentence: "Temukan nama mahasiswa dengan nama ZZZZZZZZZZZZZ",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Data not found");
          done();
        }
      });
  });
});
