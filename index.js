import readline from "readline";

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
		if (err) console.error("Error retrieving items:", err.message);
		else rows.forEach((row) => console.log(row));
		rl.close();
	});
}
