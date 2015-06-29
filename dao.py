from config import config
from pymongo import MongoClient

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
            unit = self.db.units.find_one({"id": id,"active":True})#it tries unit and checks if it can find the active id
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
        unit = self.read_one(id)#unit set equal to read once of the id. 
        unit['active']=False#active goes to false
        self.update_one(unit)# calls the update_one function to delete unit     