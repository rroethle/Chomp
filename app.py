#install mongodb from mongo's site
#pip install pymongo
#pip install flask

#!flask/bin/python
from flask import Flask, jsonify,request,abort
from config import config
from dao import *
from bson.json_util import dumps,loads
app = Flask(__name__)
@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/units', methods=['GET'])
def get_units(unit_id=None):
    return get_unit()
@app.route('/api/units/<int:unit_id>', methods=['GET'])
def get_unit(unit_id=None):
    _dao = dao()
    #unit = [unit for unit in units if unit['id'] == unit_id]
    if(unit_id==None):
        return dumps(_dao.read_all())
    else:
        unit =  _dao.read_one(unit_id)
        if (unit == None):
            return "invalid",500
        else:
            return dumps(unit)#jsonify({'unit':unit})
    
@app.route('/api/units/create', methods=['POST'])
def create_or_update_unit():
    unit = loads(request.data)
    if not unit:
        abort(400)
    _dao = dao()
    
    
    tmpunit = _dao.read_one(unit['id'])

    if(tmpunit == None):
        print "creating"
        _dao.create_one(unit)
    else:
        print "updating"
        _dao.update_one(unit)
    
    return str(unit),201
           
if __name__ == '__main__':#initalizes main program
    app.run(host="0.0.0.0")#calls app.
    
    