db = db.getSiblingDB('coriscoTST')
db.dropDatabase()
xpto = db.getCollectionNames()
if (xpto.length != 0) {
	print("Xiiiiii");
} else {
	print("Database wiped")
}
