db = db.getSiblingDB('corisco')
cursor = db.bets.find()

while ( cursor.hasNext() ) {
	printjson(cursor.next() )
}

