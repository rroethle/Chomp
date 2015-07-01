#install mongodb from mongo's site
#pip install pymongo
#pip install flask

#!flask/bin/python
from flask import Flask, jsonify,request,abort,Response
from config import config
from bson.json_util import dumps,loads
from dao import *
#from crossdomain import *
import simplejson
import os.path

app = Flask(__name__)



def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)


@app.route('/', methods=['GET'])
def index():  # pragma: no cover
    content = get_file('index.html')
    return Response(content, mimetype="text/html")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_resource(path):  # pragma: no cover
    mimetypes = {
        ".css": "text/css",
        ".html": "text/html",
        ".js": "application/javascript",
    }
    complete_path = os.path.join(root_dir(), path)
    ext = os.path.splitext(path)[1]
    mimetype = mimetypes.get(ext, "text/html")
    content = get_file(complete_path)
    return Response(content, mimetype=mimetype)



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
    
@app.route('/api/units/create', methods=['POST','GET','OPTIONS'])
def create_or_update_unit():
    print "Method has been reached "
    print request.args
    print request.values
    print request.stream
    print request.data
    print request.method
    print request.path
    print request.url
    print request.is_xhr
    print request.json
    unit = simplejson.loads(request.data)

    print "1"
    if not unit:
        abort(400)
    _dao = dao()
    
    print "2"
    tmpunit = _dao.read_one(unit['id'])

    print "3"
    if(tmpunit == None):
        print "creating"
        _dao.create_one(unit)
    else:
        print "updating"
        _dao.update_one(unit)
    
    print "4"
    return str(unit),201




           
if __name__ == '__main__':#initalizes main program
    app.run(debug=True,host="0.0.0.0")#calls app.
    
    