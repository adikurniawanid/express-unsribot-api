const request = require("supertest");
const app = require("../src/app");
const dataset = require("../public/dataset.json");

describe("NL2sql API", () => {
  for (let index = 0; index < dataset.length; index++) {
    const nl = dataset[index].nl;
    const sql = dataset[index].sql;

    it(nl, (done) => {
      request(app)
        .post("/v1/nl2sql")
        .send({
          sentence: nl,
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.status).toBe(200);
            expect(res.body.data.translate).toBe(sql);
            done();
          }
        });
    });
  }
});
