const request = require("supertest");
const app = require("../src/app");

describe("NL2sql API", () => {
  it("Success query without condition", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence: "temukan nama, nim, ipk mahasiswa",
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

  it("Success query with distinct", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence: "temukan angkatan mahasiswa secara unik",
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

  it("Success query with condition", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence:
          "temukan data mahasiswa yang memiliki nama mengandung kata adi atau nama berakhiran huruf a ipk diatas 3",
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

  it("Success query with multiple condition", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence:
          "temukan mahasiswa dosen dengan nama berawalan kata adi dan angkatan 2018 atau angkatan lebih besar sama dengan 2018",
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

  it("Success query with order", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence:
          "temukan data dosen urutkan berdasarkan nip meningkat nama menurun",
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

  it("Success query with limit", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence: "temukan data dosen batasi 5",
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
      .post("/v1/nl2sql")
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
      .post("/v1/nl2sql")
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

  it("View Not Found", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence: "Temukan adi",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("View not found");
          done();
        }
      });
  });

  it("Data Not Found", (done) => {
    request(app)
      .post("/v1/nl2sql")
      .send({
        sentence: "temukan data dosen dengan nama kurniawan",
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
