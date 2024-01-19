// import database
const db = require ("../config/database");
// membuat class Patient
class Patient {
  // buat fungsi
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      db.query(sql, (sql, results) => {
        resolve(results);
      });
  });
}

//promise 1
static async create(Patient) {
  const id = await new Promise((resolve, reject) => {
    const sql = "INSERT INTO patients SET ?";
    db.query(sql, Patient, (err, results) => {
      resolve(results.insertId);
    });
  });

   // promise 2
   return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM patients WHERE id = ?`;
    db.query(sql, id, (err, results) => {
      resolve(results);
    });
  });
}

static find(id) {
  // lakukan promise, select by id
  return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM patients WHERE id = ?`;
      db.query(sql, id, (err, results) => {
          resolve(results[0]);
      });
  });
}

static async update(id, data) {
  // update data
  await new Promise((resolve, reject) => {
      // query untuk update data
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
          resolve(results);
      });
  });

  // select data by id
  const patient = await this.find(id);
  return patient;
}

static async delete(id) {
  // query delete
  return new Promise((resolve, reject) => {
      // query sql
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
          resolve(results);
      });
  });
}

static findByStatus(data) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM patients WHERE status = ?`;
    db.query(sql, data, (sql, results) => {
      resolve(results);
    });
  });
}

  // Search patients by name
  static async search(req, res) {
    // Get the name from the request
    const name = req.params.name;

    // Create the query
    const query = `
      SELECT *
      FROM patients
      WHERE name = ?
    `;

    // Execute the query
    const patients = await connection.query(query, [name]);

    // Return the patients as JSON
    res.json(patients);
  }

 
}



// export class Patient
module.exports = Patient;
