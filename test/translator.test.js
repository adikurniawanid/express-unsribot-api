const request = require("supertest");
const app = require("../src/app");

describe("Translator API", () => {
  it("Success", (done) => {
    request(app)
      .post("/v1/translator")
      .send({
        sentence:
          "temukan nama, nim mahasiswa dengan nim diatas 0902 dan angkatan dibawah 2018 secara unik urutkan berdasarkan nama menaik batasi 5 data",
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
      .post("/v1/translator")
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
      .post("/v1/translator")
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
      .post("/v1/translator")
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
});
