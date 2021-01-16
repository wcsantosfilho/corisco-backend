db = db.getSiblingDB('coriscoTST')
db.bets.drop()
print(db.getCollectionNames())
print("Database wiped")
