import sqlite3 from "sqlite3";
sqlite3.verbose();

// open database
const db = new sqlite3.Database("mydatabase.db");

// create table

db.serialize(() => {
	db.run(
		"CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT, price REAL)"
	);

	// insert data
	const stmt = db.prepare(
		"INSERT INTO items (name,category,price) VALUES (?,?,?)"
	);
	stmt.run("Apple", "Fruit", 0.5);
	stmt.run("Banana", "Fruit", 0.5);
	stmt.run("Carrot", "Vegetable", 0.4);
	stmt.finalize();

	// query data
	db.each("SELECT id, name, category, price FROM items", (err, row) => {
		if (err) console.error(err.message);
		else console.log(row);
	});
});

// close the database
db.close();
