const request = require("supertest");
const app = require("../src/app");

describe("Preprocessor API", () => {
  it("Success", (done) => {
    request(app)
      .post("/v1/preprocessor")
      .send({
        sentence:
          "temukan mahasiswa dengan nim diatas 0902 dan angkatan dibawah 2018",
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
      .post("/v1/preprocessor")
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
});
