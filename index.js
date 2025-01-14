import readline from "readline";
import sqlite3 from "sqlite3";
sqlite3.verbose();

// initialize SQLite database
const db = new sqlite3.Database("my_database.db", (err) => {
	if (err) console.error("Database connection failed:", err.message);
	else console.log("Connected to SQLite database.\n");
});
// Ensure the 'items' table exists
db.serialize(() => {
	db.run(
		`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL,
        stock INTEGER
    )`,
		(err) => {
			if (err) {
				console.error("Error creating table:", err.message);
			} else {
				console.log("Table 'items' ensured.\n");
			}
		}
	);
});
// set up readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

//  add new item
function addItem() {
	rl.question("Enter item name: ", (name) => {
		rl.question("Enter category: ", (category) => {
			rl.question("Enter Price: ", (price) => {
				rl.question("Enter Stock: ", (stock) => {
					db.run(
						"INSERT INTO items (name, category,price,stock) VALUES (?,?,?,?)",
						[name, category, price, stock],
						(err) => {
							if (err) console.error("Error adding item:", err.message);
							else console.log("item added Successfully!");
							rl.close();
						}
					);
				});
			});
		});
	});
}

// list all items
function listItems() {
	db.all("SELECT * FROM items", (err, rows) => {
		if (err) {
			console.error("Error retrieving items:", err.message);
		} else {
			console.log("\nAll Items:");
			rows.forEach((row) => {
				console.log(
					`ID: ${row.id}, Name: ${row.name}, Category: ${row.category}, Price: ${row.price}, Stock: ${row.stock}`
				);
			});
		}
		rl.close();
	});
}

// list all categories
function listCategories() {
	db.all("SELECT DISTINCT category FROM items", (err, rows) => {
		if (err) {
			console.error("error retrieving categories:", err.message);
		} else {
			console.log("\nCategories:");
			rows.forEach((row) => console.log(row.category));
		}
		rl.close();
	});
}

// addItem();
// listItems();
listCategories();
