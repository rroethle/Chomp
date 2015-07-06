from config import config
from pymongo import MongoClient, DESCENDING

class dao(object):#class object called dao
    
    def __init__(self):#instantiating the class
        client = MongoClient(config['server'], config['port']) #the client is set to a mongo db client with a serve conn and a port config
        self.db = client.chomp #this sets the database object to client.chomp
    
    def create_one(self,unit):#this method takes in units to create and insert one into the database
        units = self.db.units# a unit is equal to one unit in the database
        unit_id = units.insert_one(unit).inserted_id #set the id of the unit to the instered id of one unit
        return unit_id #return the unit id
    
    def read_one(self,id):# this method takes in an id to look for a match in the DB
        unit = None #unit defaults to one
        try:
            unit = self.db.units.find_one({"id": id})#,"active":True})#it tries unit and checks if it can find the active id
        except:
            unit = None#if it fails unit is none and returns to beginning
        return unit#if it finds the id return
       
    def read_all(self):#this method reads and returns the whole database
        return self.db.units.find()

    def update_one(self,unit):#this method goes through and updates one unit and takes in a unit
        if(unit.get('_id')):#it checks the unit id
            del unit['_id']#deletes the unit id
        self.db.units.update({#and updates it with the new id
          'id': unit['id']
        },{
          '$set': unit,
        }, upsert=False, multi=False)

    def getMaxID(self):#this method gets the highest id in the database
        unit = self.db.find().sort({id:1}).limit(1)#this variable finds and sorts the results for the maximum unit id. 
        return  unit['id']

    def delete_one(self,id):#this method takes in an id, and reads through th database
        # unit = self.read_one(id)#unit set equal to read once of the id. 
        # unit['active']=True#active goes to false
        # self.update_one(unit)# calls the update_one function to delete unit 
        self.db.units.remove({"id": id})  


class dao_flex(object):#This is an attempt at a flexible DAO object.
    
    def __init__(self, collectionID):#instantiating the class
        client = MongoClient(config['server'], config['port']) #the client is set to a mongo db client with a serve conn and a port config
        self.db = client.chomp #this sets the database object to client.chomp
        self.collection_ID = collectionID
    
    def create_one(self,unit):#this method takes in units to create and insert one into the database
        units = self.db[self.collection_ID]# a unit is equal to one unit in the database
        unit_id = units.insert_one(unit).inserted_id #set the id of the unit to the instered id of one unit
        return unit_id #return the unit id
    
    def read_one(self,id):# this method takes in an id to look for a match in the DB
        unit = None #unit defaults to one
        try:
            unit = self.db[self.collection_ID].find_one({"id": id})#,"active":True})#it tries unit and checks if it can find the active id
        except:
            unit = None#if it fails unit is none and returns to beginning
        return unit#if it finds the id return
       
    def read_all(self):#this method reads and returns the whole database
        return self.db[self.collection_ID].find()

    def update_one(self,unit):#this method goes through and updates one unit and takes in a unit
        if(unit.get('_id')):#it checks the unit id
            del unit['_id']#deletes the unit id
        self.db[self.collection_ID].update({#and updates it with the new id
          'id': unit['id']
        },{
          '$set': unit,
        }, upsert=False, multi=False)

    def getMaxID(self):#this method gets the highest id in the database
        # print ("Entering DAO_FLEX method: getMaxID")
        unit = self.db[self.collection_ID].find({}, {'id': True, "_id" : False}).sort("id", -1).limit(1)#this variable finds and sorts the results for the maximum unit id. 
        # print ("***************Finished find/Sort")
        # print (unit)
        return unit

    def delete_one(self,id):#this method takes in an id, and reads through th database
        # unit = self.read_one(id)#unit set equal to read once of the id. 
        # unit['active']=True#active goes to false
        # self.update_one(unit)# calls the update_one function to delete unit 
        self.db[self.collection_ID].remove({"id": id})  

    def verify_user(self, unit):##This works, returns true or false depending on password correct or not
        user_name = unit["username"]
        pass_word = unit["password"]
        print user_name
        print pass_word
        temp_rec = self.db[self.collection_ID].find_one({"user": user_name})#pulls record from db
        if temp_rec != None:
            print "user found"
            temp_pw = temp_rec["pass"] #pass pulled from mongodb
            print temp_pw
            if pass_word == temp_pw:
                #do something
                return True
        elif temp_rec == None:
            print "User not found"
            return False
        return False