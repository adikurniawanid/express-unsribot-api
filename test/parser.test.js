const request = require("supertest");
const app = require("../src/app");

describe("Parser API", () => {
  it("Success", (done) => {
    request(app)
      .post("/parser")
      .send({
        sentence:
          "temukan nama, nim, angkatan mahasiswa dengan nim diatas 0902 dan angkatan dibawah 2018 atau angkatan 2017 dan nama mengandung kata adi atau nama berawal huruf a atau nama berakhir huruf n urutkan berdasarkan nama menurun",
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
      .post("/parser")
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
