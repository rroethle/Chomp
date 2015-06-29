from pymongo import MongoClient
from dao import *
from app import *
import requests
import json
def TestConsumeService(id):
   
    # POST with JSON 
    payload = { 'id': id, 'title': 'test case', 'active':True, }#sets var payload equal to a dictionary
    url = 'http://localhost:5000/api/units/create' #the url to test
    r = requests.post(url, data=json.dumps(payload)) #posting data in the form of a dump from the url
    
    # Response, status etc
    print 'Text' + str(r.text)#prints the text of r
    print 'Status'+str(r.status_code)#prints the status code of r
    
    if(r.status_code != 201):#
        print 'Text' + str(r.text)
        print 'Status'+str(r.status_code)
        return False
    
    #check that newly created item is there
    r = requests.get('http://localhost:5000/api/units/'+str(id))
    if(r.status_code!=200):
        print "failed to find newly created id"+str(id)
    
    
    
    #test update feature through post
    payload = { 'id': id, 'title': 'test case', 'student': 'dgolds', 'done': False, 'active':False, }
    url = 'http://localhost:5000/api/units/create'
    r = requests.post(url, data=json.dumps(payload))
    
    if(r.status_code != 201):
        print 'Text' + str(r.text)
        print 'Status'+str(r.status_code)
        return False
    
    return True
def TestConnect():
    try:
        testdao = dao()
    except:
        return False
    return True
def TestAddFindChangeDeleteUnit(id):
    unit = {
        'id': id,
        'title': 'test case',
        'active':True,
    }
    
    tdao = dao()
    tdao.create_one(unit) #ensure there is atleast one row of data to read, otherwise null on id
    
    count = tdao.read_all().count()
    unit = {
        'id': -1,
        'title': 'test case',
        'active':True
    }
    tdao.create_one(unit)
    if(count+1 != tdao.read_all().count()):
        print "-Failed to create a unit"
        return False
    unit2 = tdao.read_one(unit['id'])
    if(unit2['title'] == None or unit2['title']=="" or unit2['title'] != unit['title']):
        print "-failed to read a unit, pulled title is set to " + str(unit2['title'])
        return False
    unit['done']= True
    tdao.update_one(unit)
    unit2 = tdao.read_one(unit['id'])
    if(unit2['done']==False):
        print '-failed to update a unit, value set to true then updated but, result is '+str(unit2['done'])
        return False
    #tdao.delete_one(unit['id'])    
    
    return True 
def TestFeedService():
    return True
        
        
        
testID=1
if(TestConnect()==False):
    print "Failed test connection"
elif(TestConsumeService(testID)==False):
    print "Failed consuming service"
#elif(TestAddFindChangeDeleteUnit(testID)==False):
#    print "Failed Base CRUD operations"

elif(TestFeedService()==False):
    print "Failed using GET. How embarassing"
    
else:
    print "you are A-o-k"