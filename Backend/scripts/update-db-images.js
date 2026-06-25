require('dotenv').config();
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL no configurada en el archivo .env de Backend");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
  allowExitOnIdle: true,
});

async function run() {
  console.log("Conectando a la base de datos Neon para actualizar imágenes...");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const updates = [
      {
        old: 'assets/bicicleta-urbana.svg',
        new: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80'
      },
      {
        old: 'assets/notebook-lenovo.svg',
        new: 'https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=600&q=80'
      },
      {
        old: 'assets/silla-ergonomica.svg',
        new: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80'
      },
      {
        old: 'assets/fotografia-producto.svg',
        new: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
      }
    ];

    for (const item of updates) {
      const res = await client.query(
        `UPDATE post_images 
         SET image_url = $1 
         WHERE image_url = $2 OR image_url = $3 OR image_url LIKE $4`,
        [item.new, item.old, '/' + item.old, '%' + item.old]
      );
      console.log(`Actualizadas ${res.rowCount} filas de ${item.old} en post_images.`);
    }

    // Actualizar avatares en users
    const userRes = await client.query(
      `UPDATE users 
       SET avatar_url = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' 
       WHERE avatar_url LIKE '%assets/fotografia-producto.svg%' OR avatar_url IS NULL OR avatar_url = ''`
    );
    console.log(`Actualizados ${userRes.rowCount} avatares de usuario.`);

    await client.query("COMMIT");
    console.log("¡Imágenes en la base de datos actualizadas con éxito!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al actualizar las imágenes en la base de datos:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
