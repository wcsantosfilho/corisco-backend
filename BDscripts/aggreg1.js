db = db.getSiblingDB('corisco')
cursor = db.bet.find();
while ( cursor.hasNext() ) {
	printjson( cursor.next() );
}
