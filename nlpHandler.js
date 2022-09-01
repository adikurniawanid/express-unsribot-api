const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["id"], ner: { threshold: 1 } });

async function test() {
  manager.addNamedEntityText(
    "column",
    "teknik informatika",
    ["id"],
    ["TI", "informatika", "Teknik Informatika"]
  );

  manager.addNamedEntityText(
    "table",
    "dosen",
    ["id"],
    ["Dosen", "dosen", "dsn"]
  );

  manager.addNamedEntityText(
    "table",
    "mahasiswa",
    ["id"],
    ["Mahasiswa", "mhs", "mahasiswa"]
  );

  manager.addNamedEntityText(
    "table",
    "mata_kuliah",
    ["id"],
    ["mk", "Mata Kuliah", "mata kuliah", "matakuliah"]
  );

  manager.addNamedEntityText(
    "mata_kuliah",
    "algoritma dan pemrograman",
    ["id"],
    ["alpro", "Algoritma dan Pemrograman", "Algoritma & Pemrograman"]
  );

  manager.addDocument(
    "id",
    "tampilkan nama %table% %column%",
    "mahasiswaJurusan"
  );

  await manager.train();
  manager
    .process("tampilkan data dosen dan mahasiswa yang memiliki nama adi")
    .then((result) => {
      console.log(result);

      let table = result.entities.filter((element) => {
        return element.entity === "table";
      })[0];
      console.log("table", table);
    });
}

test();
