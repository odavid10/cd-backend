const { pgService } = require("../../database/database");

class ContactRepository {
  findAll = async () => {
    try {
      const sql = `SELECT * FROM "public"."contacts";`;

      const { rows } = await pgService.query(sql);

      return rows;
    } catch (error) {
      throw error;
    }
  };

  findById = async (id) => {
    try {
      const sql = `
        SELECT id_contact, names, email, phone, enterprise 
        FROM "public"."contacts"
        WHERE id_contact = $1;
      `;
      const { rows } = await pgService.query(sql, [id]);

      return rows[0];
    } catch (error) {
      throw error;
    }
  };

  create = async (names, email, phone, enterprise) => {
    try {
      const sql = `
        INSERT INTO "public"."contacts" 
        (names, email, phone, enterprise)
        VALUES ($1, $2, $3, $4) 
        RETURNING id_contact, names, email; 
      `;
      const params = [names, email, phone, enterprise];

      const { rows } = await pgService.query(sql, params);

      return rows[0];
    } catch (error) {
      throw error;
    }
  };

  update = async (id, names, email, phone, enterprise) => {
    try {
      const sql = `
        UPDATE "public"."contacts" 
        SET names = $1, 
            email = $2, 
            phone = $3, 
            enterprise = $4
        WHERE id_contact = $5
        RETURNING id_contact, names, email; 
      `;
      const params = [names, email, phone, enterprise, id];

      const { rows } = await pgService.query(sql, params);

      return rows[0];
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const sql = `
        UPDATE "public"."contacts" 
        SET active = FALSE
        WHERE id_contact = $1
        RETURNING id_contact;
      `;

      const { rowCount } = await pgService.query(sql, [id]);

      return rowCount > 0;
    } catch (error) {
      throw error;
    }
  };

  remove = async (id) => {
    try {
      const sql = `
        DELETE FROM "public"."contacts" 
        WHERE id_contact = $1
        RETURNING id_contact;
      `;

      const { rowCount } = await pgService.query(sql, [id]);

      return rowCount > 0;
    } catch (error) {
      throw error;
    }
  };
}

const contactRepository = new ContactRepository();

module.exports = { contactRepository };
